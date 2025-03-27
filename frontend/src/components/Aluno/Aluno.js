import { useState, useEffect, useCallback } from "react";
import { getAlunosByFilters, deleteAluno } from "../../services/alunosService";
import { useNavigate } from "react-router-dom";
import "./Aluno.css";

const Aluno = () => {
    const [alunos, setAlunos] = useState([]);
    const [filters, setFilters] = useState({ nome: "", email: "", matricula: "" });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const fetchAlunos = useCallback(async () => {
        try {
            const data = await getAlunosByFilters(filters, page, limit);
            setAlunos(data.data);
            setTotalRecords(data.total);
        } catch (error) {
            setErrorMessage("Erro ao carregar alunos.");
            clearMessages();
        }
    }, [filters, page, limit]);

    useEffect(() => {
        fetchAlunos();
    }, [fetchAlunos, page, filters, limit]);

    const handleDelete = async (id) => {
        try {
            await deleteAluno(id);
            setSuccessMessage("Aluno excluído com sucesso!");
            fetchAlunos();
        } catch (error) {
            setErrorMessage("Erro ao excluir aluno.");
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
        <div className="aluno-container">
            <h2 className="aluno-title">Relação de Alunos</h2>
            <button className="aluno-btn-new" onClick={() => navigate("/alunosform")}>Novo Aluno</button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="aluno-filter">
                <span>Pesquisar</span>
                <input type="text" name="nome" placeholder="Buscar por nome" value={filters.nome} onChange={handleFilterChange} />
                <input type="text" name="email" placeholder="Buscar por e-mail" value={filters.email} onChange={handleFilterChange} />
                <input type="text" name="matricula" placeholder="Buscar por matrícula" value={filters.matricula} onChange={handleFilterChange} />
            </div>

            <div className="aluno-list">
                <table className="aluno-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Matrícula</th>
                            <th>Telefone</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunos.map((aluno) => (
                            <tr key={aluno.id}>
                                <td>{aluno.nome}</td>
                                <td>{aluno.email}</td>
                                <td>{aluno.matricula}</td>
                                <td>{aluno.telefone || "Não informado"}</td>
                                <td>
                                    <button className="aluno-btn-edit" onClick={() => navigate("/alunosform", { state: aluno })}>Editar</button>
                                    <button className="aluno-btn-delete" onClick={() => handleDelete(aluno.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="aluno-pagination">
                <p>Total: {totalRecords}</p>
                <label>
                    Registros por página:
                    <select value={limit} onChange={handleLimitChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </label>
            </div>

            <div className="pagination-info">
                <span>
                    Mostrando de {((page - 1) * limit) + 1} até {Math.min(page * limit, totalRecords)} de {totalRecords} registros
                </span>
                <div className="pagination-buttons">
                    <button onClick={() => setPage(Math.max(page - 1, 1))}>Anterior</button>
                    <span>Página {page}</span>
                    <button onClick={() => setPage(Math.min(page + 1, Math.ceil(totalRecords / limit)))}>Próxima</button>
                </div>
            </div>
        </div>
    );
};

export default Aluno;