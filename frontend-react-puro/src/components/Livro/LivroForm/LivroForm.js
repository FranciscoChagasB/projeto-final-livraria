import { useState, useEffect, useRef } from "react";
import IMask from "imask";
import { GenerosEnum } from "../../../enum/GeneroEnum";

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

    const isbnInputRef = useRef(null);

    useEffect(() => {
        // Aqui, você pode colocar um código para verificar se está editando
        if (window.location.search.includes("id=")) {
            setIsEditing(true);
        }

        if (isbnInputRef.current) {
            IMask(isbnInputRef.current, {
                mask: "000-0-00-000000-0", // Máscara para ISBN
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            console.log("Livro atualizado:", formData);
        } else {
            console.log("Livro cadastrado:", formData);
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