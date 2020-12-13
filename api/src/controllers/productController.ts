import { Request, Response } from "express";
import { productService } from "../services/productService";
import { APIResponse } from "../constants/APIResponse";
import { Product } from "../constants/Product";

class ProductController {

    

    public async addProduct(req: Request, res: Response) {
        try {           
            const product: Product  =   new Product(req.body.name, req.body.price, req.body.quantity, req.body.category, req.body.status);
            const id: number        =   await productService.addProduct(product);
            
            product.id              =   id;
            
            res.json(new APIResponse(200, undefined, undefined, "SUCCESS"));
        
        } catch (error) {
            res.json(new APIResponse(400, undefined, error));
        }
    }
    

    public async getProducts(req: Request, res: Response) {
        try {
            const result    =   await productService.getProducts();
            res.json(new APIResponse(200, result));
        
        } catch (error) {
            res.json(new APIResponse(400, undefined, error));
        }
    }

    
}
export const productController: ProductController   =   new ProductController();