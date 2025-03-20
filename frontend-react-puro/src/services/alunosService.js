import axios from "axios";

const API_URL = "http://localhost:8090";

// Buscar todos os alunos com paginação
export const getAllAlunos = async (page = 1, limit = 5) => {
    try {
        const res = await axios.get(`${API_URL}/api/alunos/all?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar alunos", error);
        return { data: [], total: 0 };
    }
};

// Buscar alunos por filtros com paginação
export const getAlunosByFilters = async (filters, page = 1, limit = 5) => {
    try {
        const params = new URLSearchParams({ ...filters, page, limit }).toString();
        const res = await axios.get(`${API_URL}/api/alunos/filter?${params}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar alunos", error);
        return { data: [], total: 0 };
    }
};

// Buscar aluno por ID
export const getAlunoById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/api/alunos/${id}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar aluno por ID", error);
        return null;
    }
};

// Criar um novo aluno
export const createAluno = async (alunoData) => {
    try {
        await axios.post(`${API_URL}/api/alunos/create`, alunoData);
    } catch (error) {
        console.error("Erro ao criar aluno", error);
    }
};

// Atualizar aluno
export const updateAluno = async (id, alunoData) => {
    try {
        await axios.put(`${API_URL}/api/alunos/${id}`, alunoData);
    } catch (error) {
        console.error("Erro ao atualizar aluno", error);
    }
};

// Deletar aluno
export const deleteAluno = async (id) => {
    try {
        await axios.delete(`${API_URL}/api/alunos/${id}`);
    } catch (error) {
        console.error("Erro ao deletar aluno", error);
    }
};