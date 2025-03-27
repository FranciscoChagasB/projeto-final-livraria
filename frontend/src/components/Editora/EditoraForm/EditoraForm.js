import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IMask from "imask";
import "./EditoraForm.css";
import { Helmet } from "react-helmet";
import { createEditora, updateEditora, getEditoraById } from "../../../services/editorasService";

const EditoraForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: "",
        emailContato: "",
        telefone: "",
        cnpj: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const cnpjInputRef = useRef(null);

    const fetchEditoraData = useCallback(async (editoraId) => {
        try {
            const data = await getEditoraById(editoraId);
            if (data) {
                setFormData({
                    nome: data.nome || "",
                    emailContato: data.emailContato || "",
                    telefone: data.telefone || "",
                    cnpj: data.cnpj || "",
                });
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Erro ao carregar editora.");
            clearMessages();
        }
    }, []);

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            fetchEditoraData(id);
        }
        if (cnpjInputRef.current) {
            IMask(cnpjInputRef.current, { mask: "00.000.000/0000-00" });
        }
    }, [id, fetchEditoraData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBack = () => {
        navigate('/editora');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing) {
                await updateEditora(id, formData);
                setSuccessMessage("Editora atualizada com sucesso!");
            } else {
                await createEditora(formData);
                setSuccessMessage("Editora cadastrada com sucesso!");
            }
            setTimeout(() => navigate("/editora"), 2000);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Erro ao salvar editora.");
        } finally {
            setLoading(false);
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
        <div className="editoraform-container">
            <div className="form-container-editoraform">
                <Helmet>
                    <title>Sistema de Gerenciamento de Biblioteca</title>
                </Helmet>
                <h2 className="form-title-editoraform">{isEditing ? "Editar Editora" : "Cadastrar Editora"}</h2>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group-editoraform">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Digite o nome da editora"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group-editoraform">
                        <label htmlFor="emailContato">E-mail</label>
                        <input
                            type="email"
                            id="emailContato"
                            name="emailContato"
                            placeholder="Digite o e-mail de contato"
                            value={formData.emailContato}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group-editoraform">
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

                    <div className="form-group-editoraform">
                        <label htmlFor="cnpj">CNPJ</label>
                        <input
                            type="text"
                            id="cnpj"
                            name="cnpj"
                            placeholder="Digite o CNPJ"
                            value={formData.cnpj}
                            onChange={handleChange}
                            ref={cnpjInputRef}
                            required
                        />
                    </div>

                    <button type="submit" className="form-button-editoraform" disabled={loading}>
                        {loading ? "Salvando..." : isEditing ? "Atualizar" : "Cadastrar"}
                    </button>
                    <button className="form-button-cancel-editoraform" onClick={handleBack}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default EditoraForm;