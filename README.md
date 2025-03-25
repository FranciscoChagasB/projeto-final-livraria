# ✨ Projeto Final Capacita - Sistema de Biblioteca ✨

![GitHub repo size](https://img.shields.io/github/repo-size/FranciscoChagasB/projeto-final-livraria)
![GitHub stars](https://img.shields.io/github/stars/FranciscoChagasB/projeto-final-livraria)
![GitHub license](https://img.shields.io/github/license/FranciscoChagasB/projeto-final-livraria)

Um sistema de biblioteca completo, desenvolvido com **Node.js**, **Express**, **Prisma** e **JWT** no backend e **React**, **React Router DOM**, **Axios** e **iMask** no frontend. O sistema permite gerenciar usuários, editoras, livros, alunos e empréstimos.

## 📚 Tecnologias Utilizadas

### Backend:
- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework para criação de API REST
- **Prisma** - ORM para comunicação com o banco de dados
- **JWT (JSON Web Token)** - Autenticação segura de usuários
- **Body-Parser** - Processamento de requisições JSON

### Frontend:
- **React** - Biblioteca para criação de interfaces
- **React Router DOM** - Gerenciamento de rotas no React
- **Axios** - Requisições HTTP assíncronas
- **iMask** - Máscara para campos de entrada

## 🛠️ Instalação e Configuração

### Requisitos:
- **Node.js** instalado (versão LTS recomendada)
- **Banco de Dados PostgreSQL** configurado
- **Gerenciador de pacotes npm ou yarn**

### Clonando o Repositório:
```sh
 git clone https://github.com/FranciscoChagasB/projeto-final-livraria.git
 cd projeto-final-livraria
```

### Configuração do Backend
1. Navegue até a pasta do backend:
```sh
 cd backend
```
2. Instale as dependências:
```sh
 npm install
```
3. Configure as variáveis de ambiente no arquivo `.env`:
```env
 DATABASE_URL="sua_url_do_banco"
 JWT_SECRET="seu_segredo_jwt"
```
4. Execute as migrações do Prisma:
```sh
 npx prisma migrate dev
```
5. Inicie o servidor backend:
```sh
 npm start || npm run dev
```
O backend estará rodando em `http://localhost:8090`.

### Configuração do Frontend
1. Navegue até a pasta do frontend:
```sh
 cd frontend
```
2. Instale as dependências:
```sh
 npm install
```
3. Inicie o frontend:
```sh
 npm start
```
O frontend estará rodando em `http://localhost:3000`.

## 🛠️ Endpoints da API

### CRUDs Implementados:
| Rota               | Método | Descrição               |
|--------------------|--------|-------------------------|
| `/api/users`       | CRUD   | Gerenciamento de usuários |
| `/api/editoras`    | CRUD   | Gerenciamento de editoras |
| `/api/livros`      | CRUD   | Gerenciamento de livros |
| `/api/alunos`      | CRUD   | Gerenciamento de alunos |
| `/api/emprestimos` | CRUD   | Gerenciamento de empréstimos |

## 🔧 Funcionalidades
- ✅ Cadastro, edição e remoção de usuários
- ✅ Gestão de editoras e livros
- ✅ Controle de empréstimos e devoluções
- ✅ Autenticação segura com JWT
- ✅ Interface moderna e responsiva

## 🏢 Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

---
Desenvolvido por:
Francisco das Chagas(https://github.com/FranciscoChagasB)🚀
Lucas Davi(https://github.com/davilucasx) 🚀
Dervando Gomes(https://github.com/UchihaDevan) 🚀

