const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar uma nova editora
async function createEditora(req, res) {
    const { nome, emailContato, telefone, cnpj } = req.body;

    if (!nome || !emailContato || !cnpj) {
        return res.status(400).json({ message: 'Nome, emailContato e CNPJ são obrigatórios' });
    }

    try {
        const newEditora = await prisma.editora.create({
            data: { nome, emailContato, telefone, cnpj },
        });

        return res.status(201).json(newEditora);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar editora' });
    }
}

// Buscar todas as editoras
async function getAllEditoras(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    try {
        const editoras = await prisma.editora.findMany({
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
        });

        const total = await prisma.editora.count();

        return res.json({ total, page: pageNumber, limit: limitNumber, data: editoras });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar editoras' });
    }
}

// Buscar editoras por filtros com paginação
async function getEditorasByFilters(req, res) {
    const { nome, emailContato, cnpj, page = 1, limit = 10 } = req.query;
    
    const filters = {};
    if (nome) filters.nome = { contains: nome, mode: 'insensitive' };
    if (emailContato) filters.emailContato = { contains: emailContato, mode: 'insensitive' };
    if (cnpj) filters.cnpj = { contains: cnpj, mode: 'insensitive' };

    try {
        const editoras = await prisma.editora.findMany({
            where: filters,
            skip: (page - 1) * limit,
            take: parseInt(limit),
        });

        const total = await prisma.editora.count({ where: filters });

        return res.json({ total, page, limit, data: editoras });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar editoras' });
    }
}

// Buscar uma editora por ID
async function getEditoraById(req, res) {
    const { id } = req.params;

    try {
        const editora = await prisma.editora.findUnique({ 
            where: { id: parseInt(id, 10) } 
        });

        if (!editora) {
            return res.status(404).json({ message: 'Editora não encontrada' });
        }

        return res.json(editora);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar editora' });
    }
}

// Atualizar uma editora
async function updateEditora(req, res) {
    const { id } = req.params;
    const editoraId = parseInt(id, 10);
    const { nome, emailContato, telefone, cnpj } = req.body;

    try {
        const updatedEditora = await prisma.editora.update({
            where: { id: editoraId },
            data: { nome, emailContato, telefone, cnpj },
        });

        return res.json(updatedEditora);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar editora' });
    }
}

// Deletar uma editora
async function deleteEditora(req, res) {
    const { id } = req.params;
    const editoraId = parseInt(id, 10);

    try {
        await prisma.editora.delete({ where: { id: editoraId } });
        return res.json({ message: 'Editora deletada com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao deletar editora' });
    }
}

module.exports = {
    createEditora,
    getAllEditoras,
    getEditorasByFilters,
    getEditoraById,
    updateEditora,
    deleteEditora,
};