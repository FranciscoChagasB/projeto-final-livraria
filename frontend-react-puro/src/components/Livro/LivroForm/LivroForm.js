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
<<<<<<< Updated upstream

    const isbnInputRef = useRef(null);

    useEffect(() => {
        // Aqui, você pode colocar um código para verificar se está editando
        if (window.location.search.includes("id=")) {
=======
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    const isbnInputRef = useRef(null);

    useEffect(() => {
<<<<<<< Updated upstream
        // Aqui, você pode colocar um código para verificar se está editando
        if (window.location.search.includes("id=")) {
=======
        const fetchEditoras = async () => {
            const data = await getEditoras(1, 999);
            setEditoras(data.data);
        };

        fetchEditoras();

        // Verifica se está editando
        if (location.state) {
>>>>>>> Stashed changes
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
        if (isEditing) {
            console.log("Livro atualizado:", formData);
        } else {
            console.log("Livro cadastrado:", formData);
<<<<<<< Updated upstream
        }
=======
        }
=======

        const { titulo, isbn, ano, genero, editoraId } = formData;

        console.log("FormData enviado: ", formData);
        
        if (!titulo || !isbn || !ano || !genero || !editoraId) {
            alert("Todos os campos obrigatórios devem ser preenchidos.");
            return;
        }

        try {
            if (isEditing) {
                await updateLivro(formData.id, formData);
                alert("Livro atualizado com sucesso!");
            } else {
                await createLivro(formData);
                alert("Livro cadastrado com sucesso!");
            }
            navigate("/livro"); // Redireciona para a página de livros
        } catch (error) {
            alert("Erro ao salvar livro. Verifique os dados e tente novamente.");
        }
>>>>>>> Stashed changes
>>>>>>> Stashed changes
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