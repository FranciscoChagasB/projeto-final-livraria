const express = require('express');
const {
    createEmprestimo,
    getAllEmprestimos,
    getEmprestimosNaoDevolvidos,
    devolverEmprestimo,
    getEmprestimosByFilters,
    getEmprestimoById,
    updateEmprestimo,
    deleteEmprestimo,
} = require('../controllers/emprestimoController');

const router = express.Router();

router.post('/create', createEmprestimo);
router.get('/all', getAllEmprestimos);
router.get('/filter', getEmprestimosByFilters);
router.get('/:id', getEmprestimoById);
router.put('/:id', updateEmprestimo);
router.delete('/:id', deleteEmprestimo);
router.get('/nao-devolvidos', getEmprestimosNaoDevolvidos);
router.put('/devolver/:id', devolverEmprestimo);

module.exports = router;