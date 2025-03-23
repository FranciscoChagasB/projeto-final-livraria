import axios from "axios";

const API_URL = "http://localhost:8090";

export const getEditorasByFilters = async (filters, page = 1, limit = 5) => {
    try {
        const params = new URLSearchParams({ ...filters, page, limit }).toString();
        const res = await axios.get(`${API_URL}/api/editoras/filter?${params}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar editoras", error);
        return { data: [], total: 0 };
    }
};

export const getEditoras = async (page = 1, limit = 5) => {
    try {
        const res = await axios.get(`${API_URL}/api/editoras/all?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar editoras", error);
        return { data: [], total: 0 };
    }
};

export const getEditoraById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/api/editoras/${id}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar editora por ID", error);
        return null;
    }
};

export const createEditora = async (editoraData) => {
    try {
        await axios.post(`${API_URL}/api/editoras/create`, editoraData);
    } catch (error) {
        console.error("Erro ao criar editora", error);
    }
};

export const updateEditora = async (id, editoraData) => {
    try {
        await axios.put(`${API_URL}/api/editoras/${id}`, editoraData);
    } catch (error) {
        console.error("Erro ao atualizar editora", error);
    }
};

export const deleteEditora = async (id) => {
    try {
        await axios.delete(`${API_URL}/api/editoras/${id}`);
    } catch (error) {
        console.error("Erro ao deletar editora", error);
    }
};