const express = require('express');
const router = express.Router();
const Parse = require('../config/parseConfig');

// Criar um novo aluno
router.post('/alunos', async (req, res) => {
    const { nome, turma, curso, disciplina } = req.body;

    const Aluno = Parse.Object.extend('Aluno');
    const aluno = new Aluno();

    aluno.set('nome', nome);
    aluno.set('turma', turma);
    aluno.set('curso', curso);
    aluno.set('disciplina', disciplina);

    try {
        const resultado = await aluno.save();
        res.status(201).json({ success: true, data: resultado });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Buscar todos os alunos
router.get('/alunos', async (req, res) => {
    const Aluno = Parse.Object.extend('Aluno');
    const query = new Parse.Query(Aluno);

    try {
        const alunos = await query.find();
        res.status(200).json({ success: true, data: alunos });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Atualizar um aluno
router.put('/alunos/:id', async (req, res) => {
    const alunoId = req.params.id;
    const novosDados = req.body;

    const Aluno = Parse.Object.extend('Aluno');
    const query = new Parse.Query(Aluno);

    try {
        const aluno = await query.get(alunoId);
        Object.keys(novosDados).forEach((chave) => aluno.set(chave, novosDados[chave]));
        const resultado = await aluno.save();
        res.status(200).json({ success: true, data: resultado });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Excluir um aluno
router.delete('/alunos/:id', async (req, res) => {
    const alunoId = req.params.id;

    const Aluno = Parse.Object.extend('Aluno');
    const query = new Parse.Query(Aluno);

    try {
        const aluno = await query.get(alunoId);
        await aluno.destroy();
        res.status(200).json({ success: true, message: 'Aluno excluído com sucesso' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;