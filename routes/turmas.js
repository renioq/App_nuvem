const express = require('express');
const router = express.Router();
const Parse = require('../config/parseConfig');

// Criar uma nova turma
router.post('/turmas', async (req, res) => {
    const { nome, alunos } = req.body;

    const Turma = Parse.Object.extend('Turma');
    const turma = new Turma();

    turma.set('nome', nome);
    turma.set('alunos', alunos);

    try {
        const resultado = await turma.save();
        res.status(201).json({ success: true, data: resultado });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Buscar todas as turmas
router.get('/turmas', async (req, res) => {
    const Turma = Parse.Object.extend('Turma');
    const query = new Parse.Query(Turma);

    try {
        const turmas = await query.find();
        res.status(200).json({ success: true, data: turmas });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Atualizar uma turma
router.put('/turmas/:id', async (req, res) => {
    const turmaId = req.params.id;
    const novosDados = req.body;

    const Turma = Parse.Object.extend('Turma');
    const query = new Parse.Query(Turma);

    try {
        const turma = await query.get(turmaId);
        Object.keys(novosDados).forEach((chave) => turma.set(chave, novosDados[chave]));
        const resultado = await turma.save();
        res.status(200).json({ success: true, data: resultado });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Excluir uma turma
router.delete('/turmas/:id', async (req, res) => {
    const turmaId = req.params.id;

    const Turma = Parse.Object.extend('Turma');
    const query = new Parse.Query(Turma);

    try {
        const turma = await query.get(turmaId);
        await turma.destroy();
        res.status(200).json({ success: true, message: 'Turma excluída com sucesso' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
