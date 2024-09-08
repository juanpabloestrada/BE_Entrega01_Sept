import express from 'express';
import path from 'path';


// Dos rutas 
import products from './routes/products.routes.js';
import carts from './routes/carts.routes.js';

const app = express();

app.listen(8080,() => {
    console.log('El servidor se encuentra escuchando');
    
});



app.use(express.json());
app.use(express.urlencoded({extended : true}));


// implementamos los routers
app.use('/api/products', products);
app.use('/api/carats', carts);

