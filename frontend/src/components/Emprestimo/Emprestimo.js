import { useState, useEffect, useCallback } from "react";
import { getEmprestimosByFilters, deleteEmprestimo } from "../../services/emprestimosService";
import { useNavigate } from "react-router-dom";
import "./Emprestimo.css";

const Emprestimo = () => {
    const [emprestimos, setEmprestimos] = useState([]);
    const [filters, setFilters] = useState({ alunoId: "", livroId: "", devolvido: "" });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const fetchEmprestimos = useCallback(async () => {
        try {
            let data;
            
            // Verifica se o filtro devolvido está vazio e remove antes de fazer a requisição
            if (filters.devolvido === "") {
                const { devolvido, ...otherFilters } = filters;
                data = await getEmprestimosByFilters(otherFilters, page, limit);
            } else {
                data = await getEmprestimosByFilters(filters, page, limit);
            }
    
            setEmprestimos(data.data);
            setTotalRecords(data.total);
        } catch (error) {
            setErrorMessage("Erro ao carregar empréstimos.");
            clearMessages();
        }
    }, [filters, page, limit]);

    useEffect(() => {
        fetchEmprestimos();
    }, [fetchEmprestimos, page, filters, limit]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este empréstimo?");
        if (!confirmDelete) return;

        try {
            await deleteEmprestimo(id);
            setSuccessMessage("Empréstimo excluído com sucesso!");
            fetchEmprestimos();
        } catch (error) {
            setErrorMessage("Erro ao excluir empréstimo.");
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
        setFilters(prevFilters => {
            // Atualiza o filtro de acordo com a mudança
            const updatedFilters = { ...prevFilters, [name]: value };

            // Se devolvido for vazio, removemos o parâmetro
            if (updatedFilters.devolvido === "") {
                delete updatedFilters.devolvido;  // Remove o filtro "devolvido"
            }

            return updatedFilters;
        });
    };

    const clearMessages = () => {
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 3000);
    };

    return (
        <div className="emprestimo-container">
            <h2 className="emprestimo-title">Relação de Empréstimos</h2>
            <button className="emprestimo-btn-new" onClick={() => navigate("/emprestimosform")}>Novo Empréstimo</button>
            <button
                className="emprestimo-btn-devolver"
                onClick={() => navigate("/emprestimosdevolver")}
            >
                Devolver Empréstimos
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="emprestimo-filter">
                <span>Pesquisar</span>
                <input type="text" name="alunoId" placeholder="Buscar por aluno ID" value={filters.alunoId} onChange={handleFilterChange} />
                <input type="text" name="livroId" placeholder="Buscar por livro ID" value={filters.livroId} onChange={handleFilterChange} />
                <select name="devolvido" value={filters.devolvido || ""} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    <option value="true">Devolvidos</option>
                    <option value="false">Pendentes</option>
                </select>
            </div>

            <div className="emprestimo-list">
                <table className="emprestimo-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Aluno ID</th>
                            <th>Livros</th>
                            <th>Data Início</th>
                            <th>Data Fim</th>
                            <th>Devolvido</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emprestimos.map((emprestimo) => (
                            <tr key={emprestimo.id}>
                                <td>{emprestimo.id}</td>
                                <td>{emprestimo.alunoId}</td>
                                <td>{emprestimo.livros.map(l => l.livroId).join(", ")}</td>
                                <td>{new Date(emprestimo.dataInicio).toLocaleDateString()}</td>
                                <td>{new Date(emprestimo.dataFim).toLocaleDateString()}</td>
                                <td>{emprestimo.devolvido ? "Sim" : "Não"}</td>
                                <td>
                                    <button className="emprestimo-btn-edit" onClick={() => navigate("/emprestimosform", { state: emprestimo })}>Editar</button>
                                    <button className="emprestimo-btn-delete" onClick={() => handleDelete(emprestimo.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="emprestimo-pagination">
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

export default Emprestimo;