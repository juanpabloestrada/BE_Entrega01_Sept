import { error } from "console";
import { Router } from "express";
import {v4 as uuidv4} from 'uuid';

const router = Router();

//Array de almacenamiento
let products = [];


// GET / debera traer la lista de todos los productos de la base
router.get('/products', (req,res) => {
    res.json(products)
});

// GET /products : debera traer solo el producto con el id proporcionado
router.get('/products/:id', (req,res)=>{
    const productId = req.params.id;
    const  product = products.find(product => product.id === productId)
    if(!product){
        return res.status(404).json({error : 'Producto no encontrado'})
    }
})

//POST / : debera agregar un nuevo producto con los campos: id:number/string(autogenerable), title: string, descripcion: string
//code: string, price: number, status: boolean, stock: number 
router.post('/products', (req,res)=>{
    const {id, title, description, code, price, status, stock} = req.body;

    if(!id || !title || !description || !code || !price ||!status || !stock ) {
        return res.status(404).json({error : 'Datos invalidos'})
    }

    const statusInvalid =  status.isActive(p => p.status === status);
    if(statusInvalid){
        return res.status(404).json({error : 'Producto no encontrado'})
    }

    const newProduct = {
        id: uuidv4(),
        title,
        description,
        code,
        price,
        status,
        stock
    }

    products.psush(newProduct);
    res.status(201).json(newProduct);

})

// PUT /:pid debe de tomar un producto y actualizarlo en los campos enviados desde body. No se debe actualizar o eliminar el ID
router.put('/tareas/:id', (req,res)=>{
    const productsId = req.params.id;
    const{title, description,code,price,status,stock} = req.body;
    const productsIndex = products.findIndex(product => product.id === productsId)

    if(productsIndex === -1) {
        return res.status(404).json({error: 'Producto no encontrado'})
    }
    
    products[productsIndex] = {
        ...products[productsIndex],
        title,
        description,
        code,
        price,
        status,
        stock
    }

    res.json(products[productsIndex]);
});

// DELETE /:pid debera eliminar el producto con el pid indicado
router.delete('/products/:id', (req,res)=> {
    const productDelete = req.params.id;
    const productsIndex = products.findIndex(product => product.id === productDelete);

    if(productsIndex === -1) {
        return res.status(404).json({error: 'Producto no encontrado'})
    }

    products.splice(tareaIndx, 1);
    res.status(204).json({mensaje: 'Producto eliminado'})
})



export default router;