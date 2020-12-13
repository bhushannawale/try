"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIResponse = void 0;
class APIResponse {
    constructor(statusCode, data, error, message) {
        this.statusCode = statusCode;
        this.data = data;
        this.error = error;
        this.message = message;
    }
}
exports.APIResponse = APIResponse;
//# sourceMappingURL=APIResponse.js.map