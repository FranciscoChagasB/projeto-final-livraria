const express = require('express');
const {
    createLivro,
    getAllLivros,
    getLivrosByFilters,
    getAvailableLivros,
    getLivroById,
    updateLivro,
    deleteLivro,
} = require('../controllers/livroController');

const router = express.Router();

router.post('/create', createLivro);
router.get('/all', getAllLivros);
router.get('/filter', getLivrosByFilters);
router.get('/available', getAvailableLivros)
router.get('/:id', getLivroById);
router.put('/:id', updateLivro);
router.delete('/:id', deleteLivro);

module.exports = router;