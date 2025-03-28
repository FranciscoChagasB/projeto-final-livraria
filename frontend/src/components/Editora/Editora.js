import { useState, useEffect, useRef, useCallback } from "react";
import { getEditorasByFilters, deleteEditora } from "../../services/editorasService";
import { Link } from "react-router-dom";
import IMask from "imask";
import "./Editora.css";
import { Helmet } from "react-helmet";

const Editora = () => {
    const [editoras, setEditoras] = useState([]);
    const [filters, setFilters] = useState({ nome: "", emailContato: "", cnpj: "" });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const cnpjInputRef = useRef(null);

    const fetchEditoras = useCallback(async () => {
        try {
            const data = await getEditorasByFilters(filters, page, limit);
            setEditoras(data.data);
            setTotalRecords(data.total);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Erro ao carregar editoras.");
            clearMessages();
        }
    }, [filters, page, limit]);

    useEffect(() => {
        fetchEditoras();
    }, [fetchEditoras]);

    useEffect(() => {
        if (cnpjInputRef.current) {
            IMask(cnpjInputRef.current, { mask: "00.000.000/0000-00" });
        }
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteEditora(id);
            setSuccessMessage("Editora excluída com sucesso!");
            fetchEditoras();
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Erro ao excluir editora.");
        } finally {
            clearMessages();
        }
    };

    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
        setPage(1);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const clearMessages = () => {
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 3000);
    };

    return (
        <div className="editora-container">
            <Helmet>
                <title>Sistema de Gerenciamento de Biblioteca</title>
            </Helmet>
            <h2 className="editora-title">Relação de Editoras</h2>

            <Link to="/editoraform">
                <button className="editora-btn-new">Novo Registro</button>
            </Link>

            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibição de erros */}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="editora-filter">
                <span>Pesquisar</span>
                <input type="text" name="nome" placeholder="Buscar por nome" value={filters.nome} onChange={handleFilterChange} />
                <input type="email" name="emailContato" placeholder="Buscar por e-mail" value={filters.emailContato} onChange={handleFilterChange} />
                <input ref={cnpjInputRef} type="text" name="cnpj" placeholder="Buscar por CNPJ" value={filters.cnpj} onChange={handleFilterChange} />
            </div>

            <div className="editora-list">
                <div className="editora-table-wrapper">
                    <table className="editora-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>CNPJ</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {editoras.map((editora) => (
                                <tr key={editora.id}>
                                    <td>{editora.nome}</td>
                                    <td>{editora.emailContato}</td>
                                    <td>{editora.telefone || "N/A"}</td>
                                    <td>{editora.cnpj}</td>
                                    <td>
                                        <Link to={`/editoraform/${editora.id}`}>
                                            <button className="editora-btn-edit">Editar</button>
                                        </Link>
                                        <button className="editora-btn-delete" onClick={() => handleDelete(editora.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="editora-pagination">
                <p>Total: {totalRecords}</p>
                <label className="label-editora-pagination">
                    Registros por página:
                    <select value={limit} onChange={handleLimitChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </label>
            </div>

            <div className="pagination-info-editora">
                <span>
                    Mostrando de {((page - 1) * limit) + 1} até {Math.min(page * limit, totalRecords)} de {totalRecords} registros
                </span>
                <div className="pagination-buttons-editora">
                    <button onClick={() => setPage(Math.max(page - 1, 1))}>Anterior</button>
                    <span>Página {page}</span>
                    <button onClick={() => setPage(Math.min(page + 1, Math.ceil(totalRecords / limit)))}>Próxima</button>
                </div>
            </div>
        </div>
    );
};

export default Editora;