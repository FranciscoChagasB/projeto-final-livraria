const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Armazena a imagem na memória

// Criar um novo livro
async function createLivro(req, res) {
    const { titulo, autor, isbn, ano, genero, isDisponivel, editoraId } = req.body;
    const capa = req.file ? req.file.buffer : null; // Obtém a imagem do request

    if (!titulo || !isbn || !ano || !genero || !editoraId) {
        return res.status(400).json({ message: 'Título, ISBN, ano, gênero e editoraId são obrigatórios' });
    }

    try {
        const newLivro = await prisma.livro.create({
            data: { titulo, autor, isbn, ano, genero, isDisponivel, editoraId, capa },
        });

        return res.status(201).json(newLivro);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar livro' });
    }
}

// Buscar todos os livros
async function getAllLivros(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    try {
        const livros = await prisma.livro.findMany({
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
            include: {
                editora: true, // Inclui os dados da editora relacionada
            },
        });

        const total = await prisma.livro.count();

        return res.json({ total, page: pageNumber, limit: limitNumber, data: livros });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar livros' });
    }
}

// Buscar livros por filtros com paginação
async function getLivrosByFilters(req, res) {
    const { titulo, isbn, isDisponivel, editoraId, genero, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (titulo) filters.titulo = { contains: titulo, mode: 'insensitive' };
    if (isbn) filters.isbn = { contains: isbn, mode: 'insensitive' };
    if (isDisponivel !== undefined) filters.isDisponivel = isDisponivel === 'true';
    if (editoraId) filters.editoraId = parseInt(editoraId, 10);
    if (genero) filters.genero = genero.toLowerCase();

    try {
        const livros = await prisma.livro.findMany({
            where: filters,
            skip: (page - 1) * limit,
            take: parseInt(limit),
            include: {
                editora: true, // Inclui os dados da editora relacionada
            },
        });

        const total = await prisma.livro.count({ where: filters });

        return res.json({ total, page, limit, data: livros });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar livros' });
    }
}

// Buscar um livro por ID
async function getLivroById(req, res) {
    const { id } = req.params;

    try {
        const livro = await prisma.livro.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                editora: true, // Inclui os dados da editora relacionada
            },
        });

        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        return res.json(livro);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar livro' });
    }
}

// Atualizar um livro
async function updateLivro(req, res) {
    const { id } = req.params;
    const livroId = parseInt(id, 10);
    const { titulo, autor, isbn, ano, genero, isDisponivel, editoraId } = req.body;

    try {
        const updatedLivro = await prisma.livro.update({
            where: { id: livroId },
            data: { titulo, autor, isbn, ano, genero, isDisponivel, editoraId },
        });

        return res.json(updatedLivro);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar livro' });
    }
}

// Deletar um livro
async function deleteLivro(req, res) {
    const { id } = req.params;
    const livroId = parseInt(id, 10);

    try {
        await prisma.livro.delete({ where: { id: livroId } });
        return res.json({ message: 'Livro deletado com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao deletar livro' });
    }
}

module.exports = {
    createLivro,
    getAllLivros,
    getLivrosByFilters,
    getLivroById,
    updateLivro,
    deleteLivro,
};