import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import IMask from "imask";
import "../styles/LivroForm.css";
import ProtectedRoute from "../services/ProtectedRoute";
import Header from '../components/Header';
import { GenerosEnum } from "../enum/GeneroEnum";

const LivroForm = () => {
    const router = useRouter();
    const { query } = router;

    const [formData, setFormData] = useState({
        titulo: query.titulo || "",
        autor: query.autor || "",
        isbn: query.isbn || "",
        editora: query.editora || "",
        anoPublicacao: query.anoPublicacao || "",
        genero: query.genero || ""
    });

    const [isEditing, setIsEditing] = useState(false);

    const isbnInputRef = useRef(null);

    // Verifica se estamos em modo de edição (se a query contém um ID ou dados de livro)
    useEffect(() => {
        if (query.id) {
            setIsEditing(true);
        }
        if (isbnInputRef.current) {
            IMask(isbnInputRef.current, {
                mask: "000-0-00-000000-0", // Máscara para ISBN
            });
        }
    }, [query]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para atualizar o livro no servidor
        if (isEditing) {
            console.log("Livro atualizado:", formData);
        } else {
            console.log("Livro cadastrado:", formData);
        }
    };

    return (
        <ProtectedRoute>
            <div className="form-container">
                <Header />
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
                            ref={isbnInputRef} // Referência para o campo de ISBN
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
        </ProtectedRoute>
    );
};

export default LivroForm;