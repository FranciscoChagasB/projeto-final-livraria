import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer-container">
            <p>&copy; {new Date().getFullYear()} Sistema de Biblioteca. Todos os direitos reservados.</p>
            <p>Feito para o programa <strong>Capacita Brasil</strong> por:</p>
            <ul className="footer-links">
                <li>
                    <a href="https://github.com/FranciscoChagasB" target="_blank" rel="noopener noreferrer">
                        Francisco
                    </a>
                </li>
                <li>
                    <a href="https://github.com/UchihaDevan" target="_blank" rel="noopener noreferrer">
                        Devan
                    </a>
                </li>
                <li>
                    <a href="https://github.com/davilucasx" target="_blank" rel="noopener noreferrer">
                        Lucas
                    </a>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;