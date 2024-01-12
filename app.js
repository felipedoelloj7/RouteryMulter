const express = require('express');
const app = express();

// Configuración para parsear JSON en las peticiones
app.use(express.json());

// Configuración del puerto
const PORT = 8080;

// Rutas
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
