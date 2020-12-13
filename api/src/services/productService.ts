import { Product } from "../constants/Product";
import { executeQuery } from "./mysqlService";

class ProductService {


    public async addProduct(product: Product): Promise<any> {
        const query         =   "insert into products(name, category, price, quantity, status) values(?,?,?,?,?) ";
        const params        =   [product.name, product.category, product.price, product.quantity, product.status];
        const result: any   =   await executeQuery(query, params);
        return result.insertId;
    }

    

    public async getProducts(): Promise<any> {
        const query     =   "select * from products";
        const result    =   await executeQuery(query);
        return result;
    }




}

export const productService: ProductService  =   new ProductService();