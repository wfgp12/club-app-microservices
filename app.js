const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importamos CORS
const sequelize = require('./config/database'); // Importamos la instancia de Sequelize
const clubRoutes = require('./routes/clubRoutes');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors()); // Habilitamos CORS
app.use(bodyParser.json());

// Rutas
app.use('/api/clubs', clubRoutes);

// Sincronizamos con la base de datos
sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
    
    app.listen(PORT, () => {
        console.log(`Servidor de clubes corriendo en el puerto ${PORT}`);
    });
}).catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
});
