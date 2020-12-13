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
exports.productController = void 0;
const productService_1 = require("../services/productService");
const APIResponse_1 = require("../constants/APIResponse");
const Product_1 = require("../constants/Product");
class ProductController {
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = new Product_1.Product(req.body.name, req.body.price, req.body.quantity, req.body.category, req.body.status);
                const id = yield productService_1.productService.addProduct(product);
                product.id = id;
                res.json(new APIResponse_1.APIResponse(200, undefined, undefined, "SUCCESS"));
            }
            catch (error) {
                res.json(new APIResponse_1.APIResponse(400, undefined, error));
            }
        });
    }
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield productService_1.productService.getProducts();
                res.json(new APIResponse_1.APIResponse(200, result));
            }
            catch (error) {
                res.json(new APIResponse_1.APIResponse(400, undefined, error));
            }
        });
    }
}
exports.productController = new ProductController();
//# sourceMappingURL=productController.js.map