const express = require('express');
const router = express.Router();
const Parse = require('../config/parseConfig');

// Criar um novo professor
router.post('/professores', async (req, res) => {
    const { nome, curso, disciplina, turma } = req.body;

    const Professor = Parse.Object.extend('Professor');
    const professor = new Professor();

    professor.set('nome', nome);
    professor.set('curso', curso);
    professor.set('disciplina', disciplina);
    professor.set('turma', turma);

    try {
        const resultado = await professor.save();
        res.status(201).json({ success: true, data: resultado });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Buscar todos os professores
router.get('/professores', async (req, res) => {
    const Professor = Parse.Object.extend('Professor');
    const query = new Parse.Query(Professor);

    try {
        const professores = await query.find();
        res.status(200).json({ success: true, data: professores });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Atualizar um professor
router.put('/professores/:id', async (req, res) => {
    const professorId = req.params.id;
    const novosDados = req.body;

    const Professor = Parse.Object.extend('Professor');
    const query = new Parse.Query(Professor);

    try {
        const professor = await query.get(professorId);
        Object.keys(novosDados).forEach((chave) => professor.set(chave, novosDados[chave]));
        const resultado = await professor.save();
        res.status(200).json({ success: true, data: resultado });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Excluir um professor
router.delete('/professores/:id', async (req, res) => {
    const professorId = req.params.id;

    const Professor = Parse.Object.extend('Professor');
    const query = new Parse.Query(Professor);

    try {
        const professor = await query.get(professorId);
        await professor.destroy();
        res.status(200).json({ success: true, message: 'Professor excluído com sucesso' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
