import { useState, useEffect, useRef, useCallback } from "react";
import { getLivrosByFilters, deleteLivro } from "../../services/livrosService";
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
            IMask(isbnInputRef.current, { mask: "0000000000000" });
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

    const handleLimitChange = (e) => {
        setLimit(e.target.value);
        setPage(1);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));

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

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="livro-filter">
                <span>Pesquisar</span>
                <input type="text" name="titulo" placeholder="Buscar por título" value={filters.titulo} onChange={handleFilterChange} />
                <input type="text" ref={isbnInputRef} name="isbn" placeholder="Buscar por ISBN" value={filters.isbn} onChange={handleFilterChange} />
                <select name="genero" value={filters.genero} onChange={handleFilterChange}>
                    <option value="">Selecione um Gênero</option>
                    {Object.values(GenerosEnum).map((genero) => (
                        <option key={genero} value={genero}>{genero.replace("_", " ")}</option>
                    ))}
                </select>
                <select name="isDisponivel" value={filters.isDisponivel} onChange={handleFilterChange}>
                    <option value="">Disponibilidade</option>
                    <option value="true">Disponível</option>
                    <option value="false">Indisponível</option>
                </select>
                <select name="editoraId" value={filters.editoraId} onChange={handleFilterChange}>
                    <option value="">Selecione uma Editora</option>
                    {editoras.map((editora) => (
                        <option key={editora.id} value={editora.id}>{editora.nome}</option>
                    ))}
                </select>
            </div>

            <div className="livro-list">
                <table className="livro-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>ISBN</th>
                            <th>Disponível</th>
                            <th>Editora</th>
                            <th>Gênero</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro) => (
                            <tr key={livro.id}>
                                <td>{livro.titulo}</td>
                                <td>{livro.isbn}</td>
                                <td>{livro.isDisponivel ? "Sim" : "Não"}</td>
                                <td>{livro.editora.nome}</td>
                                <td>{livro.genero ? livro.genero.charAt(0).toUpperCase() + livro.genero.slice(1) : "Não informado"}</td>
                                <td>
                                    <button className="livro-btn-edit" onClick={() => navigate("/livrosform", { state: livro })}>Editar</button>
                                    <button className="livro-btn-delete" onClick={() => handleDelete(livro.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="livro-pagination">
                <p>Total: {totalRecords}</p>
                <label className="label-pagination-livros">
                    Registros por página:
                    <select value={limit} onChange={handleLimitChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </label>
            </div>

            <div className="pagination-info-livros">
                <span>
                    Mostrando de {((page - 1) * limit) + 1} até {Math.min(page * limit, totalRecords)} de {totalRecords} registros
                </span>
                <div className="pagination-buttons-livros">
                    <button onClick={() => setPage(Math.max(page - 1, 1))}>Anterior</button>
                    <span>Página {page}</span>
                    <button onClick={() => setPage(Math.min(page + 1, Math.ceil(totalRecords / limit)))}>Próxima</button>
                </div>
            </div>
        </div>
    );
};

export default Livro;