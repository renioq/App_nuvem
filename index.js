require('dotenv').config(); 

const express = require('express');
const path = require('path');
const frontendRoutes = require('./routes/frontendRoutes');
const cursosRoute = require('./routes/cursos');
const alunosRoute = require('./routes/alunos');
const professoresRoute = require('./routes/professores');
const turmasRoute = require('./routes/turmas');
const disciplinasRoute = require('./routes/disciplinas');

const app = express();

const cors = require('cors');
app.use(cors());

// Configurações para arquivos estáticos (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas do frontend
app.use(frontendRoutes);

// Rotas para as paginas de cursos, alunos, professores, disciplinas e turmas
app.use('/cursos', cursosRoute);
app.use('/alunos', alunosRoute);
app.use('/professores', professoresRoute);
app.use('/disciplinas', disciplinasRoute);
app.use('/turmas', turmasRoute);

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});