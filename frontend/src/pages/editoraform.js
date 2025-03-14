import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import IMask from "imask";
import "../styles/Form.css";
import ProtectedRoute from "../services/ProtectedRoute";
import Header from '../components/Header';

const EditoraForm = () => {
    const router = useRouter();
    const { query } = router;

    const [formData, setFormData] = useState({
        nome: query.nome || "",
        email: query.emailContato || "",
        telefone: query.telefone || "",
        cnpj: query.cnpj || "",
    });

    const [isEditing, setIsEditing] = useState(false);

    const cnpjInputRef = useRef(null);

    // Verifica se estamos em modo de edição (se a query contém um ID ou dados de editora)
    useEffect(() => {
        if (query.id) {
            setIsEditing(true);
        }
        if (cnpjInputRef.current) {
            IMask(cnpjInputRef.current, {
                mask: "00.000.000/0000-00", // Máscara para CNPJ
            });
        }
    }, [query]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para atualizar a editora no servidor
        if (isEditing) {
            console.log("Editora atualizada:", formData);
        } else {
            console.log("Editora cadastrada:", formData);
        }
    };

    return (
        <ProtectedRoute>
            <div className="form-container">
                <Header />
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
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Digite o e-mail de contato"
                            value={formData.email}
                            onChange={handleChange}
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
                            ref={cnpjInputRef} // Referência para o campo de CNPJ
                        />
                    </div>

                    <button type="submit" className="form-button">
                        {isEditing ? "Atualizar" : "Cadastrar"}
                    </button>
                </form>
            </div>
        </ProtectedRoute>
    );
};

export default EditoraForm;