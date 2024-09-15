const express = require('express');
const router = express.Router();
const Parse = require('../config/parseConfig');

// Criar um novo curso
router.post('/cursos', async (req, res) => {
    const { nome, duracao, disciplinas, professores, quantidadeAlunos } = req.body;

    const Curso = Parse.Object.extend('Curso');
    const curso = new Curso();

    curso.set('nome', nome);
    curso.set('duracao', duracao);
    curso.set('disciplinas', disciplinas);
    curso.set('professores', professores);
    curso.set('quantidadeAlunos', quantidadeAlunos);

    try {
        const resultado = await curso.save();
        res.status(201).json({ success: true, data: resultado });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Buscar todos os cursos
router.get('/cursos', async (req, res) => {
    const Curso = Parse.Object.extend('Curso');
    const query = new Parse.Query(Curso);

    try {
        const cursos = await query.find();
        res.status(200).json({ success: true, data: cursos });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Atualizar um curso
router.put('/cursos/:id', async (req, res) => {
    const cursoId = req.params.id;
    const novosDados = req.body;

    const Curso = Parse.Object.extend('Curso');
    const query = new Parse.Query(Curso);

    try {
        const curso = await query.get(cursoId);
        Object.keys(novosDados).forEach((chave) => curso.set(chave, novosDados[chave]));
        const resultado = await curso.save();
        res.status(200).json({ success: true, data: resultado });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Excluir um curso
router.delete('/cursos/:id', async (req, res) => {
    const cursoId = req.params.id;

    const Curso = Parse.Object.extend('Curso');
    const query = new Parse.Query(Curso);

    try {
        const curso = await query.get(cursoId);
        await curso.destroy();
        res.status(200).json({ success: true, message: 'Curso excluído com sucesso' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
