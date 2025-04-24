require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // 🔥 Usar express.json em vez de body-parser
app.use(express.static('../public')); // Serve arquivos estáticos

const complaintRoutes = require('./routes/complaints');
const residentRoutes = require('./routes/residents');

app.use('/api/residents', residentRoutes);
app.use('/api/complaints', complaintRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro na conexão:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
