"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = exports.HttpException = void 0;
class HttpException {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
    response() {
        return {
            status: this.status,
            message: this.message,
        };
    }
}
exports.HttpException = HttpException;
const sendResponse = (res, statusNumber, status, message, data) => {
    return res
        .status(statusNumber)
        .json(Object.assign(Object.assign({}, new HttpException(status, message)), { data }));
};
exports.sendResponse = sendResponse;
