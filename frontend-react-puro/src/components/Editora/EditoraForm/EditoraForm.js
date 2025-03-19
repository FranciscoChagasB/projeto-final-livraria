import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
    const cnpjInputRef = useRef(null);

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            fetchEditoraData(id);
        }
        if (cnpjInputRef.current) {
            IMask(cnpjInputRef.current, { mask: "00.000.000/0000-00" });
        }
    }, [id]);

    const fetchEditoraData = async (editoraId) => {
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
            console.error("Erro ao carregar editora:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing) {
                await updateEditora(id, formData);
            } else {
                await createEditora(formData);
            }
            navigate("/editora");
        } catch (error) {
            console.error("Erro ao salvar editora:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <Helmet>
                <title>Sistema de Gerenciamento de Biblioteca</title>
            </Helmet>
            <h2 className="form-title">{isEditing ? "Editar Editora" : "Cadastrar Editora"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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

                <div className="form-group">
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

                <div className="form-group">
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

                <div className="form-group">
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

                <button type="submit" className="form-button" disabled={loading}>
                    {loading ? "Salvando..." : isEditing ? "Atualizar" : "Cadastrar"}
                </button>
            </form>
        </div>
    );
};

export default EditoraForm;