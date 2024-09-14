const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

router.get('/cursos', (req, res) => {
    res.sendFile(__dirname + '/views/cursos.html');
});

router.get('/disciplinas', (req, res) => {
    res.sendFile(__dirname + '/views/disciplinas.html');
});

router.get('/professores', (req, res) => {
    res.sendFile(__dirname + '/views/professores.html');
});

router.get('/turmas', (req, res) => {
    res.sendFile(__dirname + '/views/turmas.html');
});

router.get('/alunos', (req, res) => {
    res.sendFile(__dirname + '/views/alunos.html');
});

module.exports = router;