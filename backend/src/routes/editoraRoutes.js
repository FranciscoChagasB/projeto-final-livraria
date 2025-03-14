const express = require('express');
const {
    createEditora,
    getAllEditoras,
    getEditorasByFilters,
    getEditoraById,
    updateEditora,
    deleteEditora,
} = require('../controllers/editoraController');

const router = express.Router();

router.post('/create', createEditora);
router.get('/all', getAllEditoras);
router.get('/filter', getEditorasByFilters);
router.get('/:id', getEditoraById);
router.put('/:id', updateEditora);
router.delete('/:id', deleteEditora);

module.exports = router;