const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes.js');
const editoraRoutes = require('./src/routes/editoraRoutes.js')

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/editoras', editoraRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});