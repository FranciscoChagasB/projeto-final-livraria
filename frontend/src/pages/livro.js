import { useState, useEffect, useRef } from "react";
import { getLivrosByFilters, deleteLivro } from "../services/livrosService";
import { getEditoras } from "../services/editorasService";
import Link from "next/link";
import IMask from "imask";
import { useRouter } from "next/router";
import "../styles/Livro.css";
import ProtectedRoute from "../services/ProtectedRoute";
import Header from '../components/Header';
import { GenerosEnum } from "../enum/GeneroEnum";
import Head from "next/head";

const LivroManager = () => {
    const [livros, setLivros] = useState([]);
    const [filters, setFilters] = useState({ titulo: "", isbn: "", isDisponivel: "", editoraId: "", genero: "" });
    const [editoras, setEditoras] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    const isbnInputRef = useRef(null);

    useEffect(() => {
        fetchLivros();
        fetchEditoras();
    }, [page, filters, limit]);

    useEffect(() => {
        if (isbnInputRef.current) {
            const maskOptions = {
                mask: "000-0-00-000000-0",  // Máscara para ISBN
            };
            const mask = IMask(isbnInputRef.current, maskOptions);
        }
    }, []);

    const fetchLivros = async () => {
        const data = await getLivrosByFilters(filters, page, limit);
        setLivros(data.data);
        setTotalRecords(data.total);
    };

    const fetchEditoras = async () => {
        const data = await getEditoras(1, 999); // Busca as editoras
        setEditoras(data.data);
    };

    const handleDelete = async (id) => {
        await deleteLivro(id);
        fetchLivros();
    };

    const handleLimitChange = (e) => {
        setLimit(e.target.value);
        setPage(1);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    return (
        <ProtectedRoute>
            <Head>
                <title>Sistema de Gerenciamento de Biblioteca</title>
            </Head>
            <div className="livro-container">
                <Header />
                <h2 className="livro-title">Relação de Livros</h2>

                <Link href="/livroform" passHref>
                    <button className="livro-btn-new">Novo Registro</button>
                </Link>

                <div className="livro-filter">
                    <span>Pesquisar</span>
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Buscar por título"
                        value={filters.titulo}
                        onChange={handleFilterChange}
                    />
                    <input
                        type="text"
                        ref={isbnInputRef}
                        name="isbn"
                        placeholder="Buscar por ISBN"
                        value={filters.isbn}
                        onChange={handleFilterChange}
                    />
                    <select name="genero" value={filters.genero} onChange={handleFilterChange}>
                        <option value="">Selecione um Gênero</option>
                        {Object.values(GenerosEnum).map((genero) => (
                            <option key={genero} value={genero}>
                                {genero.charAt(0).toUpperCase() + genero.slice(1).replace("_", " ")}
                            </option>
                        ))}
                    </select>
                    <select name="isDisponivel" value={filters.isDisponivel} onChange={handleFilterChange}>
                        <option value="">Disponibilidade</option>
                        <option value="true">Disponível</option>
                        <option value="false">Indisponível</option>
                    </select>
                    <select name="editoraId" value={filters.editoraId} onChange={handleFilterChange}>
                        <option value="">Selecione uma Editora</option>
                        {editoras.map((editora) => (
                            <option key={editora.id} value={editora.id}>
                                {editora.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="livro-list">
                    <table className="livro-table">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>ISBN</th>
                                <th>Disponível</th>
                                <th>Editora</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros.map((livro) => (
                                <tr key={livro.id}>
                                    <td>{livro.titulo}</td>
                                    <td>{livro.isbn}</td>
                                    <td>{livro.isDisponivel ? "Sim" : "Não"}</td>
                                    <td>{livro.editora.nome}</td>
                                    <td>
                                        <Link href={{ pathname: "/livroform", query: { ...livro } }}>
                                            <button className="livro-btn-edit">Editar</button>
                                        </Link>
                                        <button className="livro-btn-delete" onClick={() => handleDelete(livro.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="livro-pagination">
                    <label>
                        Registros por página:
                        <select value={limit} onChange={handleLimitChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </label>
                </div>

                <div className="pagination-info">
                    <span>
                        Mostrando de {((page - 1) * limit) + 1} até {Math.min(page * limit, totalRecords)} de {totalRecords} registros
                    </span>
                    <div className="pagination-buttons">
                        <button onClick={() => setPage(Math.max(page - 1, 1))}>Anterior</button>
                        <span>Página {page}</span>
                        <button onClick={() => setPage(Math.min(page + 1, Math.ceil(totalRecords / limit)))}>Próxima</button>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default LivroManager;