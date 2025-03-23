const express = require('express');
const {
    createAluno,
    getAllAlunos,
    getAlunosByFilters,
    getAlunoById,
    updateAluno,
    deleteAluno
} = require('../controllers/alunoController');

const router = express.Router();

router.post('/create', createAluno);
router.get('/all', getAllAlunos);
router.get('/filter', getAlunosByFilters);
router.get('/:id', getAlunoById);
router.put('/:id', updateAluno);
router.delete('/:id', deleteAluno);

module.exports = router;