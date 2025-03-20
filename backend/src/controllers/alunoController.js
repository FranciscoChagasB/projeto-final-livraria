const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um novo aluno
async function createAluno(req, res) {
    const { nome, email, telefone, matricula } = req.body;

    if (!nome || !email || !matricula) {
        return res.status(400).json({ message: 'Nome, email e matrícula são obrigatórios' });
    }

    try {
        const newAluno = await prisma.aluno.create({
            data: { nome, email, telefone, matricula },
        });

        return res.status(201).json(newAluno);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar aluno' });
    }
}

// Buscar todos os alunos com paginação
async function getAllAlunos(req, res) {
    const { page = 1, limit = 10 } = req.query;

    try {
        const alunos = await prisma.aluno.findMany({
            skip: (page - 1) * limit,
            take: parseInt(limit),
        });

        const total = await prisma.aluno.count();

        return res.json({ total, page, limit, data: alunos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar alunos' });
    }
}

// Buscar alunos por filtros com paginação
async function getAlunosByFilters(req, res) {
    const { nome, email, temEmprestimo, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (nome) filters.nome = { contains: nome, mode: 'insensitive' };
    if (email) filters.email = { contains: email, mode: 'insensitive' };

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    try {
        let alunos = await prisma.aluno.findMany({
            where: filters,
            include: { emprestimos: true },
        });

        // Filtrar alunos por status de empréstimos
        if (temEmprestimo !== undefined) {
            const temEmprestimoBool = temEmprestimo === 'true';
            alunos = alunos.filter(aluno => 
                temEmprestimoBool ? aluno.emprestimos.length > 0 : aluno.emprestimos.length === 0
            );
        }

        const total = alunos.length;

        // Aplicar paginação
        alunos = alunos.slice((pageNumber - 1) * limitNumber, pageNumber * limitNumber);

        return res.json({ total, page: pageNumber, limit: limitNumber, data: alunos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar alunos' });
    }
}

// Buscar aluno por ID
async function getAlunoById(req, res) {
    const { id } = req.params;

    try {
        const aluno = await prisma.aluno.findUnique({
            where: { id: parseInt(id, 10) },
            include: { emprestimos: true },
        });

        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        return res.json(aluno);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar aluno' });
    }
}

// Atualizar aluno
async function updateAluno(req, res) {
    const { id } = req.params;
    const { nome, email, telefone, matricula } = req.body;

    try {
        const updatedAluno = await prisma.aluno.update({
            where: { id: parseInt(id, 10) },
            data: { nome, email, telefone, matricula },
        });

        return res.json(updatedAluno);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar aluno' });
    }
}

// Deletar aluno
async function deleteAluno(req, res) {
    const { id } = req.params;

    try {
        await prisma.aluno.delete({ where: { id: parseInt(id, 10) } });
        return res.json({ message: 'Aluno deletado com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao deletar aluno' });
    }
}

module.exports = {
    createAluno,
    getAllAlunos,
    getAlunosByFilters,
    getAlunoById,
    updateAluno,
    deleteAluno,
};