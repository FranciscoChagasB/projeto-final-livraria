import { useState, useEffect } from "react";
import { getEmprestimosNaoDevolvidos, devolverEmprestimo } from "../../services/emprestimosService";
import { useNavigate } from "react-router-dom";
import "./EmprestimoDevolucao.css";

const EmprestimoDevolver = () => {
    const [emprestimos, setEmprestimos] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmprestimosNaoDevolvidos = async () => {
            try {
                const data = await getEmprestimosNaoDevolvidos();
                setEmprestimos(data);
            } catch (error) {
                setErrorMessage("Erro ao carregar empréstimos.");
                clearMessages();
            }
        };
        fetchEmprestimosNaoDevolvidos();
    }, []);

    const handleDevolver = async (id) => {
        try {
            await devolverEmprestimo(id);
            setSuccessMessage("Empréstimo devolvido com sucesso!");
            setEmprestimos(emprestimos.filter((emprestimo) => emprestimo.id !== id));
        } catch (error) {
            setErrorMessage("Erro ao devolver empréstimo.");
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
        <div className="emprestimo-devolver-container">
            <h2 className="emprestimo-devolver-title">Empréstimos Pendentes de Devolução</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="emprestimo-devolver-list">
                <table className="emprestimo-devolver-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Aluno ID</th>
                            <th>Livros</th>
                            <th>Data Início</th>
                            <th>Data Fim</th>
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
                                <td>
                                    <button
                                        className="emprestimo-devolver-btn"
                                        onClick={() => handleDevolver(emprestimo.id)}
                                    >
                                        Devolver
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="emprestimo-devolver-btn-new" onClick={() => navigate("/emprestimo")}>
                Voltar para lista
            </button>
        </div>
    );
};

export default EmprestimoDevolver;