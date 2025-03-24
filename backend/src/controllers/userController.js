const prisma = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prismaClient = new prisma.PrismaClient();

// Função para registrar um usuário
async function registerUser(req, res) {
    const { name, cpf, email, password } = req.body;
    
    // Validação simples
    if (!name || !cpf || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prismaClient.user.create({
            data: {
                name,
                cpf,
                email,
                password: hashedPassword,
            },
        });

        return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
}

// Função para login do usuário
async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const user = await prismaClient.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Senha inválida' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
}

// Função para pegar os dados do usuário a partir do token
async function getUserData(req, res) {
    const userId = req.userId;

    // Verificar se userId está presente
    if (!userId) {
        return res.status(400).json({ message: 'UserId não encontrado' });
    }

    try {
        const user = await prismaClient.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.json({
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
}

// Função para atualizar os dados do usuário
async function updateUserData(req, res) {
    const userId = req.userId;
    const { name, cpf, email } = req.body;

    try {
        const updatedUser = await prismaClient.user.update({
            where: { id: userId },
            data: {
                name,
                cpf,
                email,
            },
        });

        return res.json({
            id: updatedUser.id,
            name: updatedUser.name,
            cpf: updatedUser.cpf,
            email: updatedUser.email,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserData,
    updateUserData,
};
