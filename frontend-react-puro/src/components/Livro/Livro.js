import { useState, useEffect, useRef, useCallback } from "react";
import { getLivrosByFilters, deleteLivro, createLivro } from "../../services/livrosService";
import { getEditoras } from "../../services/editorasService";
import { useNavigate } from "react-router-dom";
import IMask from "imask";
import "./Livro.css";
import { GenerosEnum } from "../../enum/GeneroEnum";

const Livro = () => {
    const [livros, setLivros] = useState([]);
    const [filters, setFilters] = useState({ titulo: "", isbn: "", isDisponivel: "", editoraId: "", genero: "" });
    const [editoras, setEditoras] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [capa, setCapa] = useState(null);
    const isbnInputRef = useRef(null);
    const navigate = useNavigate();

    const fetchLivros = useCallback(async () => {
        try {
            let data;
            if (filters.isDisponivel === "") {
                const { isDisponivel, ...otherFilters } = filters;
                data = await getLivrosByFilters(otherFilters, page, limit);
            } else {
                data = await getLivrosByFilters(filters, page, limit);
            }
            setLivros(data.data);
            setTotalRecords(data.total);
        } catch (error) {
            setErrorMessage("Erro ao carregar os livros.");
            clearMessages();
        }
    }, [filters, page, limit]);

    const fetchEditoras = useCallback(async () => {
        try {
            const data = await getEditoras(1, 999);
            setEditoras(data.data);
        } catch (error) {
            setErrorMessage("Erro ao carregar editoras.");
            clearMessages();
        }
    }, []);

    useEffect(() => {
        fetchLivros();
        fetchEditoras();
    }, [fetchLivros, fetchEditoras, page, filters, limit]);

    useEffect(() => {
        if (isbnInputRef.current) {
            IMask(isbnInputRef.current, { mask: "000-0-00-000000-0" });
        }
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteLivro(id);
            setSuccessMessage("Livro excluído com sucesso!");
            fetchLivros();
        } catch (error) {
            setErrorMessage("Erro ao excluir livro.");
        } finally {
            clearMessages();
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const handleCapaChange = (e) => {
        setCapa(e.target.files[0]);
    };

    const handleCreateLivro = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("titulo", filters.titulo);
        formData.append("isbn", filters.isbn);
        formData.append("genero", filters.genero);
        formData.append("isDisponivel", filters.isDisponivel);
        formData.append("editoraId", filters.editoraId);
        if (capa) formData.append("capa", capa);
        
        try {
            await createLivro(formData);
            setSuccessMessage("Livro cadastrado com sucesso!");
            fetchLivros();
        } catch (error) {
            setErrorMessage("Erro ao cadastrar livro.");
        } finally {
            clearMessages();
        }
    };

    const clearMessages = () => {
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 3000);
    };

    return (
        <div className="livro-container">
            <h2 className="livro-title">Relação de Livros</h2>
            <button className="livro-btn-new" onClick={() => navigate("/livrosform")}>Novo Registro</button>
            <form onSubmit={handleCreateLivro}>
                <input type="text" name="titulo" placeholder="Título" value={filters.titulo} onChange={handleFilterChange} required />
                <input type="text" name="isbn" placeholder="ISBN" value={filters.isbn} onChange={handleFilterChange} required />
                <select name="genero" value={filters.genero} onChange={handleFilterChange} required>
                    <option value="">Selecione um Gênero</option>
                    {Object.values(GenerosEnum).map((genero) => (
                        <option key={genero} value={genero}>{genero.replace("_", " ")}</option>
                    ))}
                </select>
                <input type="file" accept="image/*" onChange={handleCapaChange} />
                <button type="submit">Cadastrar Livro</button>
            </form>
        </div>
    );
};

export default Livro;
