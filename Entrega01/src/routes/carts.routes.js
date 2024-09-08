import { Router } from "express";
import { error } from "console";

const router = Router();


//Array de almacenamiento
let carts = [];

// POST / debera crear un nuevo carrito con:
// Id:Number/String (No se debe duplicar y se debe autogenerar)
// Products : array que contendra objetos que representen cada producto

router.post('/carts', (req,res)=>{
    const {id, title, description, code, price, status, stock} = req.body;

    if(!id || !title || !description || !code || !price ||!status || !stock ) {
        return res.status(404).json({error : 'Datos invalidos'})
    }

    const statusInvalid =  status.isActive(p => p.status === status);
    if(statusInvalid){
        return res.status(404).json({error : 'Producto no encontrado'})
    }

    const newCart = {
        id: uuidv4(),
        title,
        description,
        code,
        price,
        status,
        stock
    }

    carts.psush(newCart);
    res.status(201).json(newCart);

})

// GET/:cid : deberar listar los productos que pertenezcan al carrito con el parametro cid proporcionados
router.get('carts/id', (req,res) => {
    const cartsId = req.params.id;
    const cart = carts.find(carts => carts.id === cartsId)
    if(!cart){
        return res.status(404).json({error : 'Producto no encontrado'})
    }
})

// POST /:cid/product/:pid debera agregar el producto al arreglo "products" del carrito seleccionado, agregrandose como un objeto
// product : Solo debene contener el ID del producto 
// quantity : Debe contener el número de ejemplares de dicho producto
// Si el producto ya existe intenta agregarse el al producto a incrementar el campo quantity de dicho producto

router.post(':cid/products/:pid', async (req,res)=>{
    const prodId = req.params;
    const cartId =req.params;
    const quantity = req.body;

        // Verifica que el producto exista en la base de datos 
        const product = product.findById(prodId);
        if (!product){
            return res.status(404).json({ error: 'Producto no encontrado'});
        }

        const cart = Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({error: 'carrito no encontrado'})
        }

        const productInCart = cart.products.find(p => p.product.toString() === prodId)
        if(productInCart) {
            productInCart.quantity += quantity;
        } else {
            cart.products.psush({product: prodId, quantity})
        }

        res.status(202).json({message: 'Producto añadido al carrito', cart})

});


export default router;