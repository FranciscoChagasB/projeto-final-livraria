import axios from "axios";

const API_URL = "http://localhost:3000";

export const getLivrosByFilters = async (filters, page = 1, limit = 5) => {
    try {
        const params = new URLSearchParams({ ...filters, page, limit }).toString();
        const res = await axios.get(`${API_URL}/api/livros/filter?${params}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar livros", error);
        return { data: [], total: 0 };
    }
};

export const getLivros = async (page = 1, limit = 5) => {
    try {
        const res = await axios.get(`${API_URL}/api/livros/all?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar livros", error);
        return { data: [], total: 0 };
    }
};

export const createLivro = async (livroData) => {
    try {
        await axios.post(`${API_URL}/api/livros/create`, livroData);
    } catch (error) {
        console.error("Erro ao criar livro", error);
    }
};

export const updateLivro = async (id, livroData) => {
    try {
        await axios.put(`${API_URL}/api/livros/${id}`, livroData);
    } catch (error) {
        console.error("Erro ao atualizar livro", error);
    }
};

export const deleteLivro = async (id) => {
    try {
        await axios.delete(`${API_URL}/api/livros/${id}`);
    } catch (error) {
        console.error("Erro ao deletar livro", error);
    }
};