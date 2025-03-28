import axios from "axios";

const API_URL = "http://localhost:8090";

// Buscar todos os empréstimos com paginação
export const getAllEmprestimos = async (page = 1, limit = 10) => {
    try {
        const res = await axios.get(`${API_URL}/api/emprestimos/all?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar empréstimos", error);
        return { data: [], total: 0 };
    }
};

// Buscar empréstimos não devolvidos
export const getEmprestimosNaoDevolvidos = async () => {
    try {
        const res = await axios.get(`${API_URL}/api/emprestimos/nao-devolvidos`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar empréstimos não devolvidos", error);
        return [];
    }
};

// Devolver um empréstimo (marcar como devolvido)
export const devolverEmprestimo = async (id) => {
    try {
        const res = await axios.put(`${API_URL}/api/emprestimos/devolver/${id}`);
        return res.data; // Aqui você pode retornar a resposta se necessário
    } catch (error) {
        console.error("Erro ao devolver empréstimo", error);
        throw error; // Lança o erro para que possa ser tratado no componente
    }
};

// Buscar empréstimos por filtros com paginação
export const getEmprestimosByFilters = async (filters, page = 1, limit = 10) => {
    try {
        const params = new URLSearchParams({ ...filters, page, limit }).toString();
        const res = await axios.get(`${API_URL}/api/emprestimos/filter?${params}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar empréstimos", error);
        return { data: [], total: 0 };
    }
};

// Buscar empréstimo por ID
export const getEmprestimoById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/api/emprestimos/${id}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar empréstimo por ID", error);
        return null;
    }
};

// Criar um novo empréstimo
export const createEmprestimo = async (emprestimoData) => {
    try {
        await axios.post(`${API_URL}/api/emprestimos/create`, emprestimoData);
    } catch (error) {
        console.error("Erro ao criar empréstimo", error);
    }
};

// Atualizar empréstimo (marcar como devolvido)
export const updateEmprestimo = async (id, emprestimoData) => {
    try {
        await axios.put(`${API_URL}/api/emprestimos/${id}`, emprestimoData);
    } catch (error) {
        console.error("Erro ao atualizar empréstimo", error);
    }
};

// Deletar um empréstimo
export const deleteEmprestimo = async (id) => {
    try {
        await axios.delete(`${API_URL}/api/emprestimos/${id}`);
    } catch (error) {
        console.error("Erro ao deletar empréstimo", error);
    }
};