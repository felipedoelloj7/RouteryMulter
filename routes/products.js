const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const productosFilePath = path.join(__dirname, '../productos.json');

// Función de utilidad para leer productos desde el archivo
async function getProductsFromFile() {
  try {
    const data = await fs.readFile(productosFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Datos de ejemplo (puedes usar una base de datos en lugar de esto)
let products = [
  { id: 1, title: 'Producto 1', description: 'Descripción del Producto 1', code: 'P001', price: 10.99, status: true, stock: 50, category: 'Electrónicos', thumbnails: ['/images/product1_1.jpg', '/images/product1_2.jpg'] },
  { id: 2, title: 'Producto 2', description: 'Descripción del Producto 2', code: 'P002', price: 19.99, status: true, stock: 30, category: 'Ropa', thumbnails: ['/images/product2_1.jpg', '/images/product2_2.jpg'] },
  // ... otros productos
];

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productosDesdeArchivo = await getProductsFromFile();
    const limit = req.query.limit || productosDesdeArchivo.length;
    
    // Combina los productos del archivo con los productos existentes
    const combinedProducts = [...productosDesdeArchivo, ...products];

    res.json(combinedProducts.slice(0, limit));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta para obtener un producto por ID
router.get('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const productosDesdeArchivo = await getProductsFromFile();
    
    // Buscar el producto por ID en los productos del archivo
    const productFromFile = productosDesdeArchivo.find(p => p.id === productId);

    // Si el producto no está en el archivo, buscarlo en los productos existentes
    const product = productFromFile || products.find(p => p.id === productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// Resto de las rutas...

module.exports = router;
