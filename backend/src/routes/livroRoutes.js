const express = require('express');
const multer = require('multer');
const { createLivro, getAllLivros, getLivrosByFilters, getLivroById, updateLivro, deleteLivro } = require('../controllers/livroController');


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/create', createLivro);
router.get('/all', getAllLivros);
router.get('/filter', getLivrosByFilters);
router.get('/:id', getLivroById);
router.put('/:id', updateLivro);
router.delete('/:id', deleteLivro);
router.post('/create', upload.single('capa'), createLivro); // Agora aceita a capa

module.exports = router;