import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import IMask from "imask";
import { GenerosEnum } from "../../../enum/GeneroEnum";
import { createLivro, updateLivro } from "../../../services/livrosService";

const LivroForm = () => {
    const [formData, setFormData] = useState({
        titulo: "",
        autor: "",
        isbn: "",
        editora: "",
        anoPublicacao: "",
        genero: ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const [livroId, setLivroId] = useState(null);
    const isbnInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        if (id) {
            setIsEditing(true);
            setLivroId(id);
            fetchLivro(id);
        }

        if (isbnInputRef.current) {
            IMask(isbnInputRef.current, {
                mask: "000-0-00-000000-0", // Máscara para ISBN
            });
        }
    }, []);

    const fetchLivro = async (id) => {
        try {
            const response = await fetch(`http://localhost:8090/api/livros/${id}`);
            if (response.ok) {
                const data = await response.json();
                setFormData(data);
            } else {
                console.error("Erro ao buscar livro");
            }
        } catch (error) {
            console.error("Erro ao buscar livro:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (isEditing) {
                await updateLivro(livroId, formData);
                alert("Livro atualizado com sucesso!");
            } else {
                await createLivro(formData);
                alert("Livro cadastrado com sucesso!");
            }
            navigate("/livro"); // Redireciona para a página de livros
        } catch (error) {
            alert("Erro ao salvar livro. Verifique os dados e tente novamente.");
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{isEditing ? "Editar Livro" : "Cadastrar Livro"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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

                <div className="form-group">
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

                <div className="form-group">
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

                <div className="form-group">
                    <label htmlFor="editora">Editora</label>
                    <input
                        type="text"
                        id="editora"
                        name="editora"
                        placeholder="Digite a editora do livro"
                        value={formData.editora}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="anoPublicacao">Ano de Publicação</label>
                    <input
                        type="number"
                        id="anoPublicacao"
                        name="anoPublicacao"
                        placeholder="Digite o ano de publicação"
                        value={formData.anoPublicacao}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
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

                <button type="submit" className="form-button">
                    {isEditing ? "Atualizar" : "Cadastrar"}
                </button>
            </form>
        </div>
    );
};

export default LivroForm;