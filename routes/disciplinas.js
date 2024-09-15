const express = require('express');
const router = express.Router();
const Parse = require('../config/parseConfig');

// Criar uma nova disciplina
router.post('/disciplinas', async (req, res) => {
    const { nome, professor, duracao, turma } = req.body;

    const Disciplina = Parse.Object.extend('Disciplina');
    const disciplina = new Disciplina();

    disciplina.set('nome', nome);
    disciplina.set('professor', professor);
    disciplina.set('duracao', duracao);
    disciplina.set('turma', turma);

    try {
        const resultado = await disciplina.save();
        res.status(201).json({ success: true, data: resultado });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Buscar todas as disciplinas
router.get('/disciplinas', async (req, res) => {
    const Disciplina = Parse.Object.extend('Disciplina');
    const query = new Parse.Query(Disciplina);

    try {
        const disciplinas = await query.find();
        res.status(200).json({ success: true, data: disciplinas });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Atualizar uma disciplina
router.put('/disciplinas/:id', async (req, res) => {
    const disciplinaId = req.params.id;
    const novosDados = req.body;

    const Disciplina = Parse.Object.extend('Disciplina');
    const query = new Parse.Query(Disciplina);

    try {
        const disciplina = await query.get(disciplinaId);
        Object.keys(novosDados).forEach((chave) => disciplina.set(chave, novosDados[chave]));
        const resultado = await disciplina.save();
        res.status(200).json({ success: true, data: resultado });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Excluir uma disciplina
router.delete('/disciplinas/:id', async (req, res) => {
    const disciplinaId = req.params.id;

    const Disciplina = Parse.Object.extend('Disciplina');
    const query = new Parse.Query(Disciplina);

    try {
        const disciplina = await query.get(disciplinaId);
        await disciplina.destroy();
        res.status(200).json({ success: true, message: 'Disciplina excluída com sucesso' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
