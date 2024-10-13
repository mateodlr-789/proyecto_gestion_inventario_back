import { Request, Response } from 'express';
import Product from '../models/product'


export const getProducts = async( req: Request , res: Response ) => {
    const product = await Product.findAll();
   

    res.status(200).json({ product });
}

export const createProduct = async(req: Request, res: Response) =>{
    const { body } = req;
    try{
        const product = await Product.create(body);
        res.json({ product })
    }catch(error){
        console.error(error);
        res.status(400).json({
            msg: 'Hable con el administrador'
        }) 

    }
    
}