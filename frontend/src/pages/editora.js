import { useState, useEffect } from "react";
import { getEditorasByFilters, deleteEditora } from "../services/editorasService";
import Link from "next/link";
import IMask from "imask";
import { useRef } from "react";
import "../styles/Editora.css";
import ProtectedRoute from "../services/ProtectedRoute";
import Header from '../components/Header';

const EditoraManager = () => {
    const [editoras, setEditoras] = useState([]);
    const [filters, setFilters] = useState({ nome: "", emailContato: "", cnpj: "" });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);  // Default to 10 records per page
    const [totalRecords, setTotalRecords] = useState(0);  // Total records to display

    const cnpjInputRef = useRef(null);  // Usando useRef para referenciar o campo de CNPJ

    useEffect(() => {
        fetchEditoras();
    }, [page, filters, limit]);

    useEffect(() => {
        if (cnpjInputRef.current) {
            const maskOptions = {
                mask: "00.000.000/0000-00",
            };
            const mask = IMask(cnpjInputRef.current, maskOptions);
        }
    }, []);

    const fetchEditoras = async () => {
        const data = await getEditorasByFilters(filters, page, limit);
        setEditoras(data.data);
        setTotalRecords(data.total);  // Assume that the API returns the total count of records
    };

    const handleDelete = async (id) => {
        await deleteEditora(id);
        fetchEditoras();
    };

    const handleLimitChange = (e) => {
        setLimit(e.target.value);
        setPage(1);  // Reset to the first page whenever the limit changes
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
            <div className="editora-container">
                <Header />
                <h2 className="editora-title">Relação de Editoras</h2>

                <Link href="/editoraform" passHref>
                    <button className="editora-btn-new">Novo Registro</button>
                </Link>

                <div className="editora-filter">
                    <span>Pesquisar</span>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Buscar por nome"
                        value={filters.nome}
                        onChange={handleFilterChange}
                    />
                    <input
                        type="email"
                        name="emailContato"
                        placeholder="Buscar por e-mail"
                        value={filters.emailContato}
                        onChange={handleFilterChange}
                    />
                    <input
                        ref={cnpjInputRef}
                        type="text"
                        name="cnpj"
                        placeholder="Buscar por CNPJ"
                        value={filters.cnpj}
                        onChange={handleFilterChange}
                    />
                </div>

                <div className="editora-list">
                    <table className="editora-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>CNPJ</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {editoras.map((editora) => (
                                <tr key={editora.id}>
                                    <td>{editora.nome}</td>
                                    <td>{editora.emailContato}</td>
                                    <td>{editora.telefone || "N/A"}</td>
                                    <td>{editora.cnpj}</td>
                                    <td>
                                        <Link href={{ pathname: "/editoraform", query: { ...editora } }}>
                                            <button className="editora-btn-edit">Editar</button>
                                        </Link>
                                        <button className="editora-btn-delete" onClick={() => handleDelete(editora.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="editora-pagination">
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

export default EditoraManager;