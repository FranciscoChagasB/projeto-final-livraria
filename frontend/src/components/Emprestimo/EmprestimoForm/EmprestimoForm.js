import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createEmprestimo, updateEmprestimo } from "../../../services/emprestimosService";
import { getAllAlunos } from "../../../services/alunosService";
import { getLivrosDisponiveis } from "../../../services/livrosService";
import './EmprestimoForm.css'

const EmprestimoForm = () => {
    const [formData, setFormData] = useState({
        alunoId: "",
        livros: [],
        dataFim: ""
    });
    const [alunos, setAlunos] = useState([]);
    const [livros, setLivros] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchAlunos();
        fetchLivrosDisponiveis();
        if (location.state) {
            setIsEditing(true);
            setFormData({
                alunoId: location.state.alunoId,
                livros: location.state.livros.map(l => l.livroId),  // Certificando que é um array de IDs
                dataFim: location.state.dataFim.substring(0, 10)
            });
        }
    }, [location.state]);

    const fetchAlunos = async () => {
        const data = await getAllAlunos();
        setAlunos(data.data);
    };

    const fetchLivrosDisponiveis = async () => {
        const data = await getLivrosDisponiveis();
        setLivros(data.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLivrosChange = (livroId) => {
        // Alternar a seleção do livro
        const livrosSelecionados = formData.livros.includes(livroId)
            ? formData.livros.filter(id => id !== livroId)  // Desmarcar se já estiver selecionado
            : [...formData.livros, livroId];  // Marcar o livro se não estiver selecionado

        setFormData({ ...formData, livros: livrosSelecionados });
    };

    const handleBack = () => {
        navigate('/emprestimo');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.alunoId || formData.livros.length === 0 || !formData.dataFim) {
            setErrorMessage("Todos os campos são obrigatórios.");
            clearMessages();
            return;
        }

        try {
            const emprestimoData = {
                alunoId: parseInt(formData.alunoId),
                livros: formData.livros,
                dataFim: formData.dataFim
            };

            console.log(emprestimoData);

            if (isEditing) {
                await updateEmprestimo(location.state.id, emprestimoData);
                setSuccessMessage("Empréstimo atualizado com sucesso!");
            } else {
                await createEmprestimo(emprestimoData);
                setSuccessMessage("Empréstimo cadastrado com sucesso!");
            }

            clearMessages();
            setTimeout(() => {
                fetchLivrosDisponiveis(); // Recarregar a lista de livros disponíveis após o empréstimo
                navigate("/emprestimo");
            }, 1000); // Navegar de volta para a lista
        } catch (error) {
            setErrorMessage("Erro ao salvar empréstimo. Verifique os dados e tente novamente.");
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
        <div className="emprestimoform-container">
            <div className="form-container-emprestimoform">
                <h2 className="form-title-emprestimoform">{isEditing ? "Editar Empréstimo" : "Cadastrar Empréstimo"}</h2>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group-emprestimoform">
                        <label htmlFor="alunoId">Aluno</label>
                        <select id="alunoId" name="alunoId" value={formData.alunoId} onChange={handleChange}>
                            <option value="">Selecione um aluno</option>
                            {alunos.map(aluno => (
                                <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group-emprestimoform">
                        <label htmlFor="livros">Livros</label>
                        <div className="livros-options">
                            {livros.map(livro => (
                                <div key={livro.id} className="livro-option">
                                    <input
                                        type="checkbox"
                                        id={`livro-${livro.id}`}
                                        value={livro.id}
                                        checked={formData.livros.includes(livro.id)}
                                        onChange={() => handleLivrosChange(livro.id)}
                                    />
                                    <label htmlFor={`livro-${livro.id}`}>{livro.titulo}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group-emprestimoform">
                        <label htmlFor="dataFim">Data de Devolução</label>
                        <input
                            type="date"
                            id="dataFim"
                            name="dataFim"
                            value={formData.dataFim}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="form-button-emprestimoform">
                        {isEditing ? "Atualizar" : "Cadastrar"}
                    </button>
                    <button className="form-button-cancelar-emprestimoform" onClick={handleBack}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default EmprestimoForm;