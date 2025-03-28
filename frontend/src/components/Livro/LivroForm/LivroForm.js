import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import IMask from "imask";
import { GenerosEnum } from "../../../enum/GeneroEnum";
import { createLivro, updateLivro } from "../../../services/livrosService";
import { getEditoras } from "../../../services/editorasService";
import './LivroForm.css'

const LivroForm = () => {
    const [formData, setFormData] = useState({
        titulo: "",
        autor: "",
        isbn: "",
        editoraId: "",
        ano: "",
        genero: ""
    });

    const [editoras, setEditoras] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const isbnInputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchEditoras = async () => {
            try {
                const data = await getEditoras(1, 999);
                setEditoras(data.data);
            } catch (error) {
                setErrorMessage("Erro ao carregar editoras.");
                clearMessages();
            }
        };

        fetchEditoras();

        // Verifica se está editando
        if (location.state) {
            setIsEditing(true);
            setFormData(location.state);
        }

        if (isbnInputRef.current) {
            IMask(isbnInputRef.current, {
                mask: "0000000000000", // Máscara para ISBN
            });
        }
    }, [location.state]);

    const handleCancel = () => {
        navigate("/livro"); // Voltar para a página de listagem de livros
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "editoraId" || name === "ano" ? Number(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { titulo, isbn, ano, genero, editoraId } = formData;

        console.log("FormData enviado: ", formData);

        if (!titulo || !isbn || !ano || !genero || !editoraId) {
            setErrorMessage("Todos os campos obrigatórios devem ser preenchidos.");
            clearMessages();
            return;
        }

        try {
            if (isEditing) {
                await updateLivro(formData.id, formData);
                setSuccessMessage("Livro atualizado com sucesso!");
            } else {
                await createLivro(formData);
                setSuccessMessage("Livro cadastrado com sucesso!");
            }
            clearMessages();
            setTimeout(() => navigate("/livro"), 1000);
        } catch (error) {
            setErrorMessage("Erro ao salvar livro. Verifique os dados e tente novamente.");
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
        <div className="livroform-container">
            <div className="form-container-livroform">
                <h2 className="form-title-livroform">{isEditing ? "Editar Livro" : "Cadastrar Livro"}</h2>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group-livroform">
                        <label htmlFor="titulo">Título</label>
                        <input
                            type="text"
                            id="titulo"
                            name="titulo"
                            placeholder="Digite o título do livro"
                            value={formData.titulo}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group-livroform">
                        <label htmlFor="autor">Autor</label>
                        <input
                            type="text"
                            id="autor"
                            name="autor"
                            placeholder="Digite o autor do livro"
                            value={formData.autor}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group-livroform">
                        <label htmlFor="isbn">ISBN</label>
                        <input
                            type="text"
                            id="isbn"
                            name="isbn"
                            placeholder="Digite o ISBN"
                            value={formData.isbn}
                            onChange={handleChange}
                            ref={isbnInputRef}
                        />
                    </div>

                    <div className="form-group-livroform">
                        <label htmlFor="editoraId">Editora</label>
                        <select
                            id="editoraId"
                            name="editoraId"
                            value={formData.editoraId}
                            onChange={handleChange}
                        >
                            <option value="">Selecione uma editora</option>
                            {editoras.map((editora) => (
                                <option key={editora.id} value={editora.id}>
                                    {editora.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group-livroform">
                        <label htmlFor="ano">Ano de Publicação</label>
                        <input
                            type="number"
                            id="ano"
                            name="ano"
                            placeholder="Digite o ano de publicação"
                            value={formData.ano}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group-livroform">
                        <label htmlFor="genero">Gênero</label>
                        <select
                            id="genero"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                        >
                            <option value="">Selecione um gênero</option>
                            {Object.values(GenerosEnum).map((genero) => (
                                <option key={genero} value={genero}>
                                    {genero.charAt(0).toUpperCase() + genero.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="form-button-livroform">
                        {isEditing ? "Atualizar" : "Cadastrar"}
                    </button>

                    <button type="button" className="form-button-cancelar-livroform" onClick={handleCancel}>
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LivroForm;