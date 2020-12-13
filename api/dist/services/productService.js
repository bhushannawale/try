"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const mysqlService_1 = require("./mysqlService");
class ProductService {
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "insert into products(name, category, price, quantity, status) values(?,?,?,?,?) ";
            const params = [product.name, product.category, product.price, product.quantity, product.status];
            const result = yield mysqlService_1.executeQuery(query, params);
            return result.insertId;
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "select * from products";
            const result = yield mysqlService_1.executeQuery(query);
            return result;
        });
    }
}
exports.productService = new ProductService();
//# sourceMappingURL=productService.js.map