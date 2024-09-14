const express = require('express');
const path = require('path');
const frontendRoutes = require('./routes/frontendRoutes');

const app = express();

// Configurações para arquivos estáticos (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas do frontend
app.use(frontendRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});