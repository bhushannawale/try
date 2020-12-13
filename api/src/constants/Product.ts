
export class Product {

    public id?: number;
    public name: string;
    public price: number;
    public quantity: number;
    public status?: boolean;
    public category?: string;

    public constructor(name: string, price: number, quantity: number, category: string, status: boolean) {
        this.name       =   name;
        this.price      =   price;
        this.quantity   =   quantity;
        this.category =   category;
        this.status     =   status;
    }

}