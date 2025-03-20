const { PrismaClient } = require('@prisma/client');
const { getAlunosByFilters } = require('./alunoController');
const prisma = new PrismaClient();

// Criar um novo empréstimo
async function createEmprestimo(req, res) {
    const { alunoId, livros, dataFim } = req.body;

    if (!alunoId || !livros || livros.length === 0 || !dataFim) {
        return res.status(400).json({ message: 'AlunoId, livros e dataFim são obrigatórios' });
    }

    try {
        const emprestimo = await prisma.emprestimo.create({
            data: {
                alunoId,
                dataFim: new Date(dataFim),
                livros: {
                    create: livros.map(livroId => ({ livroId })),
                },
            },
            include: { livros: true },
        });

        return res.status(201).json(emprestimo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar empréstimo' });
    }
}

// Buscar todos os empréstimos
async function getAllEmprestimos(req, res) {
    const { page = 1, limit = 10 } = req.query;

    try {
        const emprestimos = await prisma.emprestimo.findMany({
            skip: (page - 1) * limit,
            take: parseInt(limit),
            include: { aluno: true, livros: { include: { livro: true } } },
        });

        const total = await prisma.emprestimo.count();

        return res.json({ total, page, limit, data: emprestimos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar empréstimos' });
    }
}

// Buscar empréstimos por filtros com paginação
async function getEmprestimosByFilters(req, res) {
    const { aluno, livro, devolvido, previstaParaFim, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (devolvido !== undefined) filters.devolvido = devolvido === 'true';

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    try {
        let emprestimos = await prisma.emprestimo.findMany({
            where: filters,
            include: {
                aluno: true,
                livros: { include: { livro: true } }
            },
        });

        // Filtrar por nome do aluno
        if (aluno) {
            emprestimos = emprestimos.filter(emprestimo =>
                emprestimo.aluno.nome.toLowerCase().includes(aluno.toLowerCase())
            );
        }

        // Filtrar por título do livro
        if (livro) {
            emprestimos = emprestimos.filter(emprestimo =>
                emprestimo.livros.some(l => l.livro.titulo.toLowerCase().includes(livro.toLowerCase()))
            );
        }

        // Filtrar empréstimos com data de devolução prevista para X dias
        if (previstaParaFim) {
            const dataLimite = new Date();
            dataLimite.setDate(dataLimite.getDate() + parseInt(previstaParaFim, 10));

            emprestimos = emprestimos.filter(emprestimo =>
                new Date(emprestimo.dataFim) <= dataLimite
            );
        }

        const total = emprestimos.length;

        // Aplicar paginação
        emprestimos = emprestimos.slice((pageNumber - 1) * limitNumber, pageNumber * limitNumber);

        return res.json({ total, page: pageNumber, limit: limitNumber, data: emprestimos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar empréstimos' });
    }
}

// Buscar empréstimo por ID
async function getEmprestimoById(req, res) {
    const { id } = req.params;

    try {
        const emprestimo = await prisma.emprestimo.findUnique({
            where: { id: parseInt(id, 10) },
            include: { aluno: true, livros: { include: { livro: true } } },
        });

        if (!emprestimo) {
            return res.status(404).json({ message: 'Empréstimo não encontrado' });
        }

        return res.json(emprestimo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar empréstimo' });
    }
}

// Atualizar empréstimo (marcar como devolvido)
async function updateEmprestimo(req, res) {
    const { id } = req.params;
    const { devolvido } = req.body;

    try {
        const updatedEmprestimo = await prisma.emprestimo.update({
            where: { id: parseInt(id, 10) },
            data: { devolvido },
        });

        return res.json(updatedEmprestimo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar empréstimo' });
    }
}

// Deletar um empréstimo
async function deleteEmprestimo(req, res) {
    const { id } = req.params;

    try {
        await prisma.emprestimo.delete({ where: { id: parseInt(id, 10) } });
        return res.json({ message: 'Empréstimo deletado com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao deletar empréstimo' });
    }
}

module.exports = {
    createEmprestimo,
    getAllEmprestimos,
    getEmprestimosByFilters,
    getEmprestimoById,
    updateEmprestimo,
    deleteEmprestimo,
};