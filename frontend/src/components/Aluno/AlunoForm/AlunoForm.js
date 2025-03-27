import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createAluno, updateAluno } from "../../../services/alunosService";
import "./AlunoForm.css";

const AlunoForm = () => {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        telefone: "",
        matricula: ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setIsEditing(true);
            setFormData(location.state);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleBack = () => {
        navigate('/aluno');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { nome, email, matricula } = formData;

        if (!nome || !email || !matricula) {
            setErrorMessage("Os campos Nome, Email e Matrícula são obrigatórios.");
            clearMessages();
            return;
        }

        try {
            if (isEditing) {
                await updateAluno(formData.id, formData);
                setSuccessMessage("Aluno atualizado com sucesso!");
            } else {
                await createAluno(formData);
                setSuccessMessage("Aluno cadastrado com sucesso!");
            }
            clearMessages();
            setTimeout(() => navigate("/aluno"), 1000);
        } catch (error) {
            setErrorMessage("Erro ao salvar aluno. Verifique os dados e tente novamente.");
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
        <div className="alunoform-container">
            <div className="form-container-alunoform">
                <h2 className="form-title-alunoform">{isEditing ? "Editar Aluno" : "Cadastrar Aluno"}</h2>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group-alunoform">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Digite o nome do aluno"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group-alunoform">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Digite o e-mail"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group-alunoform">
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            type="text"
                            id="telefone"
                            name="telefone"
                            placeholder="Digite o telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group-alunoform">
                        <label htmlFor="matricula">Matrícula</label>
                        <input
                            type="text"
                            id="matricula"
                            name="matricula"
                            placeholder="Digite a matrícula"
                            value={formData.matricula}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="form-button-alunoform">
                        {isEditing ? "Atualizar" : "Cadastrar"}
                    </button>
                    <button className="form-button-cancelar-alunoform" onClick={handleBack}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default AlunoForm;