const express = require('express');
const router = express.Router();

// Datos de ejemplo (puedes usar una base de datos en lugar de esto)
let carts = [];

// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
  // Generar un nuevo ID para el carrito (simulación, en una base de datos real usarías un mecanismo diferente)
  const newCartId = carts.length + 1;

  // Crear el nuevo carrito
  const newCart = {
    id: newCartId,
    products: [],
  };

  // Agregar el nuevo carrito a la lista
  carts.push(newCart);

  // Devolver el nuevo carrito como respuesta
  res.json(newCart);
});

module.exports = router;
