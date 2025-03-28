import axios from "axios";

const API_URL = "http://localhost:8090";

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

export const getBookCover = async (isbn) => {
    try {
        const response = await axios.get(`${GOOGLE_BOOKS_API_URL}?q=isbn:${isbn}`);
        const book = response.data.items ? response.data.items[0] : null;
        if (book && book.volumeInfo.imageLinks) {
            return book.volumeInfo.imageLinks.thumbnail;
        }
        return 'https://placehold.co/200x300'; // Retorna um placeholder caso não haja capa
    } catch (error) {
        console.error('Erro ao obter capa do livro', error);
        return 'https://placehold.co/200x300'; // Retorna um placeholder em caso de erro
    }
};

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

export const getLivrosDisponiveis = async (page = 1, limit = 100) => {
    try {
        const res = await axios.get(`${API_URL}/api/livros/available?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar livros disponíveis", error);
        return { data: [], total: 0 };
    }
};

export const getLivroById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/api/livros/${id}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar livro", error);
        return null;
    }
};

export const createLivro = async (livroData) => {
    try {
        await axios.post(`${API_URL}/api/livros/create`, livroData);
    } catch (error) {
        console.error("Erro ao criar livro:", error.response?.data || error.message);
        throw error;
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