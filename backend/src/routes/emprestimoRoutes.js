const express = require('express');
const {
    createEmprestimo,
    getAllEmprestimos,
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

module.exports = router;