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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherOperation = exports.TaskOperation = exports.StaffOperation = exports.DriverTaskOperation = exports.CustomerOperation = exports.ShippingBillOperation = exports.ShipmentOperation = exports.AuthOperation = exports.SendingOrderRequestOperation = exports.OrderLocationOperation = exports.GiftOrderTopicOperation = exports.FavouriteOrderLocationOperation = exports.OrdersOperation = exports.ConfigOperation = exports.CargoInsuranceOperation = exports.AgencyOperation = void 0;
var axios_1 = require("axios");
var AgencyOperation = /** @class */ (function () {
    function AgencyOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/agency';
    }
    AgencyOperation.prototype.create = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_1 = _c.sent();
                        console.log("Error creating agency: ", (_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_1 === null || error_1 === void 0 ? void 0 : error_1.request);
                        return [2 /*return*/, {
                                success: (_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_1 === null || error_1 === void 0 ? void 0 : error_1.request,
                                status: error_1.response ? error_1.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.search = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_2 = _c.sent();
                        console.log("Error searching agency: ", (_a = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_2 === null || error_2 === void 0 ? void 0 : error_2.request);
                        return [2 /*return*/, {
                                success: (_b = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_2 === null || error_2 === void 0 ? void 0 : error_2.request,
                                status: error_2.response ? error_2.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.update = function (id, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update/").concat(id), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_3 = _c.sent();
                        console.log("Error updating agency: ", (_a = error_3 === null || error_3 === void 0 ? void 0 : error_3.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_3 === null || error_3 === void 0 ? void 0 : error_3.request);
                        return [2 /*return*/, {
                                success: (_b = error_3 === null || error_3 === void 0 ? void 0 : error_3.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_3 === null || error_3 === void 0 ? void 0 : error_3.request,
                                status: error_3.response ? error_3.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.delete = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_4 = _c.sent();
                        console.log("Error deleting agency: ", (_a = error_4 === null || error_4 === void 0 ? void 0 : error_4.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_4 === null || error_4 === void 0 ? void 0 : error_4.request);
                        return [2 /*return*/, {
                                success: (_b = error_4 === null || error_4 === void 0 ? void 0 : error_4.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_4 === null || error_4 === void 0 ? void 0 : error_4.request,
                                status: error_4.response ? error_4.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.downloadContractFile = function (fileId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_5;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/contract/download/").concat(fileId), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                                responseType: 'stream',
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                                stream: response.data, // Dữ liệu stream của file
                            }];
                    case 2:
                        error_5 = _c.sent();
                        console.log("Error downloading contract file: ", (_a = error_5 === null || error_5 === void 0 ? void 0 : error_5.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_5 === null || error_5 === void 0 ? void 0 : error_5.request);
                        return [2 /*return*/, {
                                success: (_b = error_5 === null || error_5 === void 0 ? void 0 : error_5.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_5 === null || error_5 === void 0 ? void 0 : error_5.request,
                                status: error_5.response ? error_5.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.downloadCompanyLicenseFile = function (fileId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_6;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/company/license/download/").concat(fileId), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                                responseType: 'stream',
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                                stream: response.data, // Dữ liệu stream của file
                            }];
                    case 2:
                        error_6 = _c.sent();
                        console.log("Error downloading company license file: ", (_a = error_6 === null || error_6 === void 0 ? void 0 : error_6.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_6 === null || error_6 === void 0 ? void 0 : error_6.request);
                        return [2 /*return*/, {
                                success: (_b = error_6 === null || error_6 === void 0 ? void 0 : error_6.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_6 === null || error_6 === void 0 ? void 0 : error_6.request,
                                status: error_6.response ? error_6.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AgencyOperation;
}());
exports.AgencyOperation = AgencyOperation;
var CargoInsuranceOperation = /** @class */ (function () {
    function CargoInsuranceOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/cargo_insurance';
    }
    CargoInsuranceOperation.prototype.getByCustomerId = function (orderId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_7;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/order/get/").concat(orderId), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_7 = _c.sent();
                        console.log("Error fetching cargo insurance: ", (_a = error_7 === null || error_7 === void 0 ? void 0 : error_7.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_7 === null || error_7 === void 0 ? void 0 : error_7.request);
                        return [2 /*return*/, {
                                success: (_b = error_7 === null || error_7 === void 0 ? void 0 : error_7.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_7 === null || error_7 === void 0 ? void 0 : error_7.request,
                                status: error_7.response ? error_7.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CargoInsuranceOperation.prototype.update = function (updateDto, id, token, files) {
        return __awaiter(this, void 0, void 0, function () {
            var formData_1, response, error_8;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData_1 = new FormData();
                        // Append all fields from updateDto to formData
                        Object.keys(updateDto).forEach(function (key) {
                            formData_1.append(key, updateDto[key]);
                        });
                        // If there are files, append them to formData
                        if (files && files.length > 0) {
                            files.forEach(function (file) { return formData_1.append("file", file); });
                        }
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update/").concat(id), formData_1, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_8 = _c.sent();
                        console.log("Error updating cargo insurance: ", (_a = error_8 === null || error_8 === void 0 ? void 0 : error_8.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_8 === null || error_8 === void 0 ? void 0 : error_8.request);
                        return [2 /*return*/, {
                                success: (_b = error_8 === null || error_8 === void 0 ? void 0 : error_8.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_8 === null || error_8 === void 0 ? void 0 : error_8.request,
                                status: error_8.response ? error_8.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CargoInsuranceOperation.prototype.create = function (payload, token, files) {
        return __awaiter(this, void 0, void 0, function () {
            var formData_2, response, error_9;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData_2 = new FormData();
                        // Append all fields from payload to formData
                        Object.keys(payload).forEach(function (key) {
                            formData_2.append(key, payload[key]);
                        });
                        // If there are files, append them to formData
                        if (files && files.length > 0) {
                            files.forEach(function (file) { return formData_2.append("file", file); });
                        }
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), formData_2, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_9 = _c.sent();
                        console.log("Error creating cargo insurance: ", (_a = error_9 === null || error_9 === void 0 ? void 0 : error_9.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_9 === null || error_9 === void 0 ? void 0 : error_9.request);
                        return [2 /*return*/, {
                                success: (_b = error_9 === null || error_9 === void 0 ? void 0 : error_9.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_9 === null || error_9 === void 0 ? void 0 : error_9.request,
                                status: error_9.response ? error_9.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CargoInsuranceOperation;
}());
exports.CargoInsuranceOperation = CargoInsuranceOperation;
var ConfigOperation = /** @class */ (function () {
    function ConfigOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/config';
    }
    ConfigOperation.prototype.configDeposit = function (dto, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_10;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/deposit"), dto, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_10 = _c.sent();
                        console.log("Error updating deposit config: ", (_a = error_10 === null || error_10 === void 0 ? void 0 : error_10.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_10 === null || error_10 === void 0 ? void 0 : error_10.request);
                        return [2 /*return*/, {
                                success: (_b = error_10 === null || error_10 === void 0 ? void 0 : error_10.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_10 === null || error_10 === void 0 ? void 0 : error_10.request,
                                status: error_10.response ? error_10.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigOperation.prototype.configServiceOnWard = function (dto, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_11;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/service"), dto, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_11 = _c.sent();
                        console.log("Error updating service on ward: ", (_a = error_11 === null || error_11 === void 0 ? void 0 : error_11.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_11 === null || error_11 === void 0 ? void 0 : error_11.request);
                        return [2 /*return*/, {
                                success: (_b = error_11 === null || error_11 === void 0 ? void 0 : error_11.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_11 === null || error_11 === void 0 ? void 0 : error_11.request,
                                status: error_11.response ? error_11.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigOperation.prototype.getServicesByWardId = function (wardId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_12;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/service/").concat(wardId), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_12 = _c.sent();
                        console.log("Error fetching services by ward: ", (_a = error_12 === null || error_12 === void 0 ? void 0 : error_12.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_12 === null || error_12 === void 0 ? void 0 : error_12.request);
                        return [2 /*return*/, {
                                success: (_b = error_12 === null || error_12 === void 0 ? void 0 : error_12.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_12 === null || error_12 === void 0 ? void 0 : error_12.request,
                                status: error_12.response ? error_12.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ConfigOperation;
}());
exports.ConfigOperation = ConfigOperation;
var OrdersOperation = /** @class */ (function () {
    function OrdersOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/order';
    }
    OrdersOperation.prototype.create = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_13;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_13 = _c.sent();
                        console.log("Error creating order: ", (_a = error_13 === null || error_13 === void 0 ? void 0 : error_13.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_13 === null || error_13 === void 0 ? void 0 : error_13.request);
                        return [2 /*return*/, { success: (_b = error_13 === null || error_13 === void 0 ? void 0 : error_13.response) === null || _b === void 0 ? void 0 : _b.data, request: error_13 === null || error_13 === void 0 ? void 0 : error_13.request, status: error_13.response ? error_13.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.search = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_14;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_14 = _c.sent();
                        console.log("Error searching orders: ", (_a = error_14 === null || error_14 === void 0 ? void 0 : error_14.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_14 === null || error_14 === void 0 ? void 0 : error_14.request);
                        return [2 /*return*/, { success: (_b = error_14 === null || error_14 === void 0 ? void 0 : error_14.response) === null || _b === void 0 ? void 0 : _b.data, request: error_14 === null || error_14 === void 0 ? void 0 : error_14.request, status: error_14.response ? error_14.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.getById = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_15;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_15 = _c.sent();
                        console.log("Error getting order by id: ", (_a = error_15 === null || error_15 === void 0 ? void 0 : error_15.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_15 === null || error_15 === void 0 ? void 0 : error_15.request);
                        return [2 /*return*/, {
                                success: (_b = error_15 === null || error_15 === void 0 ? void 0 : error_15.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_15 === null || error_15 === void 0 ? void 0 : error_15.request,
                                status: error_15.response ? error_15.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.calculateFee = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_16;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/fee/calculate"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_16 = _c.sent();
                        console.log("Error calculating fee: ", (_a = error_16 === null || error_16 === void 0 ? void 0 : error_16.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_16 === null || error_16 === void 0 ? void 0 : error_16.request);
                        return [2 /*return*/, { success: (_b = error_16 === null || error_16 === void 0 ? void 0 : error_16.response) === null || _b === void 0 ? void 0 : _b.data, request: error_16 === null || error_16 === void 0 ? void 0 : error_16.request, status: error_16.response ? error_16.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.uploadImage = function (orderId, type, files, token) {
        return __awaiter(this, void 0, void 0, function () {
            var formData_3, response, error_17;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData_3 = new FormData();
                        files.forEach(function (file) { return formData_3.append("file", file); });
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/image/upload"), formData_3, {
                                params: { orderId: orderId, type: type },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                    "Content-Type": "multipart/form-data",
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_17 = _c.sent();
                        console.error("Error updating image: ", (_a = error_17 === null || error_17 === void 0 ? void 0 : error_17.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_17 === null || error_17 === void 0 ? void 0 : error_17.request);
                        return [2 /*return*/, {
                                success: (_b = error_17 === null || error_17 === void 0 ? void 0 : error_17.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_17 === null || error_17 === void 0 ? void 0 : error_17.request,
                                status: error_17.response ? error_17.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.downloadImage = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_18;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/image/download"), {
                                params: {
                                    fileId: payload.fileId
                                },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                                responseType: 'stream'
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_18 = _c.sent();
                        console.log("Error downloading image: ", (_a = error_18 === null || error_18 === void 0 ? void 0 : error_18.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_18 === null || error_18 === void 0 ? void 0 : error_18.request);
                        return [2 /*return*/, { success: (_b = error_18 === null || error_18 === void 0 ? void 0 : error_18.response) === null || _b === void 0 ? void 0 : _b.data, request: error_18 === null || error_18 === void 0 ? void 0 : error_18.request, status: error_18.response ? error_18.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.deleteImage = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_19;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/image/delete/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_19 = _c.sent();
                        console.error("Error deleting image: ", (_a = error_19 === null || error_19 === void 0 ? void 0 : error_19.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_19 === null || error_19 === void 0 ? void 0 : error_19.request);
                        return [2 /*return*/, {
                                success: (_b = error_19 === null || error_19 === void 0 ? void 0 : error_19.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_19 === null || error_19 === void 0 ? void 0 : error_19.request,
                                status: error_19.response ? error_19.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.uploadSignature = function (payload, orderId, type, token) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, i, response, error_20;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        for (i = 0; i < payload.files.length; i++) {
                            formData.append('file', payload.files[i]);
                        }
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/signature/upload"), formData, {
                                params: {
                                    orderId: orderId,
                                    type: type
                                },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_20 = _b.sent();
                        console.error("Request that caused the error: ", error_20 === null || error_20 === void 0 ? void 0 : error_20.request);
                        return [2 /*return*/, { success: (_a = error_20 === null || error_20 === void 0 ? void 0 : error_20.response) === null || _a === void 0 ? void 0 : _a.data, request: error_20 === null || error_20 === void 0 ? void 0 : error_20.request, status: error_20.response ? error_20.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.downloadSignature = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_21;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/signature/download"), {
                                params: {
                                    fileId: payload.fileId
                                },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                                responseType: 'stream'
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_21 = _c.sent();
                        console.log("Error downloading signature: ", (_a = error_21 === null || error_21 === void 0 ? void 0 : error_21.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_21 === null || error_21 === void 0 ? void 0 : error_21.request);
                        return [2 /*return*/, { success: (_b = error_21 === null || error_21 === void 0 ? void 0 : error_21.response) === null || _b === void 0 ? void 0 : _b.data, request: error_21 === null || error_21 === void 0 ? void 0 : error_21.request, status: error_21.response ? error_21.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.getCurrentShipperJourney = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_22;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipper/current_journey/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_22 = _c.sent();
                        console.log("Error getting current shipper journey: ", (_a = error_22 === null || error_22 === void 0 ? void 0 : error_22.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_22 === null || error_22 === void 0 ? void 0 : error_22.request);
                        return [2 /*return*/, {
                                success: (_b = error_22 === null || error_22 === void 0 ? void 0 : error_22.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_22 === null || error_22 === void 0 ? void 0 : error_22.request,
                                status: error_22.response ? error_22.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.getShipperWhoTakenOrder = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_23;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipper/get/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_23 = _c.sent();
                        console.log("Error getting shipper who taken order: ", (_a = error_23 === null || error_23 === void 0 ? void 0 : error_23.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_23 === null || error_23 === void 0 ? void 0 : error_23.request);
                        return [2 /*return*/, {
                                success: (_b = error_23 === null || error_23 === void 0 ? void 0 : error_23.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_23 === null || error_23 === void 0 ? void 0 : error_23.request,
                                status: error_23.response ? error_23.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.confirmEnteringAgency = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_24;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/confirm_entering_agency/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_24 = _c.sent();
                        console.log("Error confirming order entering agency: ", (_a = error_24 === null || error_24 === void 0 ? void 0 : error_24.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_24 === null || error_24 === void 0 ? void 0 : error_24.request);
                        return [2 /*return*/, {
                                success: (_b = error_24 === null || error_24 === void 0 ? void 0 : error_24.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_24 === null || error_24 === void 0 ? void 0 : error_24.request,
                                status: error_24.response ? error_24.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.updateOrder = function (id, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_25;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update/").concat(id), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_25 = _c.sent();
                        console.log("Error updating order: ", (_a = error_25 === null || error_25 === void 0 ? void 0 : error_25.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_25 === null || error_25 === void 0 ? void 0 : error_25.request);
                        return [2 /*return*/, {
                                success: (_b = error_25 === null || error_25 === void 0 ? void 0 : error_25.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_25 === null || error_25 === void 0 ? void 0 : error_25.request,
                                status: error_25.response ? error_25.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.deleteOrder = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_26;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_26 = _c.sent();
                        console.log("Error deleting order: ", (_a = error_26 === null || error_26 === void 0 ? void 0 : error_26.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_26 === null || error_26 === void 0 ? void 0 : error_26.request);
                        return [2 /*return*/, {
                                success: (_b = error_26 === null || error_26 === void 0 ? void 0 : error_26.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_26 === null || error_26 === void 0 ? void 0 : error_26.request,
                                status: error_26.response ? error_26.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.getOrderInsurance = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_27;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/insurance/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_27 = _c.sent();
                        console.log("Error getting order insurance: ", (_a = error_27 === null || error_27 === void 0 ? void 0 : error_27.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_27 === null || error_27 === void 0 ? void 0 : error_27.request);
                        return [2 /*return*/, {
                                success: (_b = error_27 === null || error_27 === void 0 ? void 0 : error_27.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_27 === null || error_27 === void 0 ? void 0 : error_27.request,
                                status: error_27.response ? error_27.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.getProcessingOrders = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_28;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/status/processing"), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_28 = _c.sent();
                        console.log("Error getting processing orders: ", (_a = error_28 === null || error_28 === void 0 ? void 0 : error_28.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_28 === null || error_28 === void 0 ? void 0 : error_28.request);
                        return [2 /*return*/, {
                                success: (_b = error_28 === null || error_28 === void 0 ? void 0 : error_28.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_28 === null || error_28 === void 0 ? void 0 : error_28.request,
                                status: error_28.response ? error_28.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.getAllOrders = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_29;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_29 = _c.sent();
                        console.log("Error getting all orders: ", (_a = error_29 === null || error_29 === void 0 ? void 0 : error_29.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_29 === null || error_29 === void 0 ? void 0 : error_29.request);
                        return [2 /*return*/, {
                                success: (_b = error_29 === null || error_29 === void 0 ? void 0 : error_29.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_29 === null || error_29 === void 0 ? void 0 : error_29.request,
                                status: error_29.response ? error_29.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.getThirdPartyOrders = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_30;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/status/needThirdParty"), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_30 = _c.sent();
                        console.log("Error getting third party orders: ", (_a = error_30 === null || error_30 === void 0 ? void 0 : error_30.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_30 === null || error_30 === void 0 ? void 0 : error_30.request);
                        return [2 /*return*/, {
                                success: (_b = error_30 === null || error_30 === void 0 ? void 0 : error_30.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_30 === null || error_30 === void 0 ? void 0 : error_30.request,
                                status: error_30.response ? error_30.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OrdersOperation;
}());
exports.OrdersOperation = OrdersOperation;
var FavouriteOrderLocationOperation = /** @class */ (function () {
    function FavouriteOrderLocationOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/favorite_order_location';
    }
    // CUSTOMER
    FavouriteOrderLocationOperation.prototype.create = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_31;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_31 = _c.sent();
                        console.log("Error creating favorite location: ", (_a = error_31 === null || error_31 === void 0 ? void 0 : error_31.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_31 === null || error_31 === void 0 ? void 0 : error_31.request);
                        return [2 /*return*/, { success: (_b = error_31 === null || error_31 === void 0 ? void 0 : error_31.response) === null || _b === void 0 ? void 0 : _b.data, request: error_31 === null || error_31 === void 0 ? void 0 : error_31.request, status: error_31.response ? error_31.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // CUSTOMER
    FavouriteOrderLocationOperation.prototype.findAll = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_32;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get"), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_32 = _c.sent();
                        console.log("Error searching favorite location: ", (_a = error_32 === null || error_32 === void 0 ? void 0 : error_32.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_32 === null || error_32 === void 0 ? void 0 : error_32.request);
                        return [2 /*return*/, { success: (_b = error_32 === null || error_32 === void 0 ? void 0 : error_32.response) === null || _b === void 0 ? void 0 : _b.data, request: error_32 === null || error_32 === void 0 ? void 0 : error_32.request, status: error_32.response ? error_32.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // CUSTOMER
    FavouriteOrderLocationOperation.prototype.update = function (id, dto, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_33;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update/").concat(id), dto, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_33 = _c.sent();
                        console.log("Error updating favourite order location: ", (_a = error_33 === null || error_33 === void 0 ? void 0 : error_33.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_33 === null || error_33 === void 0 ? void 0 : error_33.request);
                        return [2 /*return*/, { success: (_b = error_33 === null || error_33 === void 0 ? void 0 : error_33.response) === null || _b === void 0 ? void 0 : _b.data, request: error_33 === null || error_33 === void 0 ? void 0 : error_33.request, status: error_33.response ? error_33.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // CUSTOMER
    FavouriteOrderLocationOperation.prototype.delete = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_34;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_34 = _c.sent();
                        console.log("Error deleting favourite order location: ", (_a = error_34 === null || error_34 === void 0 ? void 0 : error_34.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_34 === null || error_34 === void 0 ? void 0 : error_34.request);
                        return [2 /*return*/, { success: (_b = error_34 === null || error_34 === void 0 ? void 0 : error_34.response) === null || _b === void 0 ? void 0 : _b.data, request: error_34 === null || error_34 === void 0 ? void 0 : error_34.request, status: error_34.response ? error_34.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FavouriteOrderLocationOperation;
}());
exports.FavouriteOrderLocationOperation = FavouriteOrderLocationOperation;
var GiftOrderTopicOperation = /** @class */ (function () {
    function GiftOrderTopicOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/gift_order_topic';
    }
    // ADMIN
    GiftOrderTopicOperation.prototype.create = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_35;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_35 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_35 === null || error_35 === void 0 ? void 0 : error_35.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_35 === null || error_35 === void 0 ? void 0 : error_35.request);
                        return [2 /*return*/, { success: (_b = error_35 === null || error_35 === void 0 ? void 0 : error_35.response) === null || _b === void 0 ? void 0 : _b.data, request: error_35 === null || error_35 === void 0 ? void 0 : error_35.request, status: error_35.response ? error_35.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ADMIN
    GiftOrderTopicOperation.prototype.findAll = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_36;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get"), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_36 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_36 === null || error_36 === void 0 ? void 0 : error_36.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_36 === null || error_36 === void 0 ? void 0 : error_36.request);
                        return [2 /*return*/, { success: (_b = error_36 === null || error_36 === void 0 ? void 0 : error_36.response) === null || _b === void 0 ? void 0 : _b.data, request: error_36 === null || error_36 === void 0 ? void 0 : error_36.request, status: error_36.response ? error_36.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return GiftOrderTopicOperation;
}());
exports.GiftOrderTopicOperation = GiftOrderTopicOperation;
var OrderLocationOperation = /** @class */ (function () {
    function OrderLocationOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/order_location';
    }
    // CUSTOMER
    OrderLocationOperation.prototype.create = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_37;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_37 = _c.sent();
                        console.log("Error creating order location: ", (_a = error_37 === null || error_37 === void 0 ? void 0 : error_37.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_37 === null || error_37 === void 0 ? void 0 : error_37.request);
                        return [2 /*return*/, { success: (_b = error_37 === null || error_37 === void 0 ? void 0 : error_37.response) === null || _b === void 0 ? void 0 : _b.data, request: error_37 === null || error_37 === void 0 ? void 0 : error_37.request, status: error_37.response ? error_37.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // CUSTOMER
    OrderLocationOperation.prototype.findAll = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_38;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get"), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_38 = _c.sent();
                        console.log("Error fetching order locations: ", (_a = error_38 === null || error_38 === void 0 ? void 0 : error_38.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_38 === null || error_38 === void 0 ? void 0 : error_38.request);
                        return [2 /*return*/, { success: (_b = error_38 === null || error_38 === void 0 ? void 0 : error_38.response) === null || _b === void 0 ? void 0 : _b.data, request: error_38 === null || error_38 === void 0 ? void 0 : error_38.request, status: error_38.response ? error_38.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderLocationOperation.prototype.update = function (id, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_39;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update/").concat(id), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_39 = _c.sent();
                        console.log("Error updating order location: ", (_a = error_39 === null || error_39 === void 0 ? void 0 : error_39.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_39 === null || error_39 === void 0 ? void 0 : error_39.request);
                        return [2 /*return*/, {
                                success: (_b = error_39 === null || error_39 === void 0 ? void 0 : error_39.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_39 === null || error_39 === void 0 ? void 0 : error_39.request,
                                status: error_39.response ? error_39.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // CUSTOMER
    OrderLocationOperation.prototype.destroy = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_40;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_40 = _c.sent();
                        console.log("Error deleting order location: ", (_a = error_40 === null || error_40 === void 0 ? void 0 : error_40.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_40 === null || error_40 === void 0 ? void 0 : error_40.request);
                        return [2 /*return*/, {
                                success: (_b = error_40 === null || error_40 === void 0 ? void 0 : error_40.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_40 === null || error_40 === void 0 ? void 0 : error_40.request,
                                status: error_40.response ? error_40.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OrderLocationOperation;
}());
exports.OrderLocationOperation = OrderLocationOperation;
var SendingOrderRequestOperation = /** @class */ (function () {
    function SendingOrderRequestOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/sending_order_request';
    }
    // SHIPPER: Hủy yêu cầu lấy hàng
    SendingOrderRequestOperation.prototype.cancel = function (orderId, reason, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_41;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/cancel"), {
                                params: { orderId: orderId, reason: reason },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_41 = _c.sent();
                        console.log("Error canceling sending order request: ", (_a = error_41 === null || error_41 === void 0 ? void 0 : error_41.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_41 === null || error_41 === void 0 ? void 0 : error_41.request);
                        return [2 /*return*/, {
                                success: (_b = error_41 === null || error_41 === void 0 ? void 0 : error_41.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_41 === null || error_41 === void 0 ? void 0 : error_41.request,
                                status: error_41.response ? error_41.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SHIPPER, ADMIN, AGENCY: Tra cứu yêu cầu lấy hàng
    SendingOrderRequestOperation.prototype.search = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_42;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_42 = _c.sent();
                        console.log("Error searching sending order requests: ", (_a = error_42 === null || error_42 === void 0 ? void 0 : error_42.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_42 === null || error_42 === void 0 ? void 0 : error_42.request);
                        return [2 /*return*/, {
                                success: (_b = error_42 === null || error_42 === void 0 ? void 0 : error_42.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_42 === null || error_42 === void 0 ? void 0 : error_42.request,
                                status: error_42.response ? error_42.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SHIPPER: Tiếp nhận đơn hàng (accept)
    SendingOrderRequestOperation.prototype.accept = function (orderId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_43;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/accept/").concat(orderId), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_43 = _c.sent();
                        console.log("Error accepting sending order request: ", (_a = error_43 === null || error_43 === void 0 ? void 0 : error_43.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_43 === null || error_43 === void 0 ? void 0 : error_43.request);
                        return [2 /*return*/, {
                                success: (_b = error_43 === null || error_43 === void 0 ? void 0 : error_43.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_43 === null || error_43 === void 0 ? void 0 : error_43.request,
                                status: error_43.response ? error_43.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SendingOrderRequestOperation;
}());
exports.SendingOrderRequestOperation = SendingOrderRequestOperation;
var AuthOperation = /** @class */ (function () {
    function AuthOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/auth';
    }
    AuthOperation.prototype.loggedInByCustomer = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_44;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/customer/login"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_44 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_44 === null || error_44 === void 0 ? void 0 : error_44.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_44 === null || error_44 === void 0 ? void 0 : error_44.request);
                        return [2 /*return*/, { success: (_b = error_44 === null || error_44 === void 0 ? void 0 : error_44.response) === null || _b === void 0 ? void 0 : _b.data, request: error_44 === null || error_44 === void 0 ? void 0 : error_44.request, status: error_44.response ? error_44.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthOperation.prototype.verifyOtp = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_45;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/otp/verify"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_45 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_45 === null || error_45 === void 0 ? void 0 : error_45.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_45 === null || error_45 === void 0 ? void 0 : error_45.request);
                        return [2 /*return*/, { success: (_b = error_45 === null || error_45 === void 0 ? void 0 : error_45.response) === null || _b === void 0 ? void 0 : _b.data, request: error_45 === null || error_45 === void 0 ? void 0 : error_45.request, status: error_45.response ? error_45.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthOperation.prototype.loggedInByStaff = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_46;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/staff/login"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_46 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_46 === null || error_46 === void 0 ? void 0 : error_46.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_46 === null || error_46 === void 0 ? void 0 : error_46.request);
                        return [2 /*return*/, { success: (_b = error_46 === null || error_46 === void 0 ? void 0 : error_46.response) === null || _b === void 0 ? void 0 : _b.data, request: error_46 === null || error_46 === void 0 ? void 0 : error_46.request, status: error_46.response ? error_46.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthOperation;
}());
exports.AuthOperation = AuthOperation;
var ShipmentOperation = /** @class */ (function () {
    function ShipmentOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/shipment';
    }
    ShipmentOperation.prototype.create = function (dto, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_47;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), dto, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_47 = _c.sent();
                        console.log("Error creating shipment: ", (_a = error_47 === null || error_47 === void 0 ? void 0 : error_47.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_47 === null || error_47 === void 0 ? void 0 : error_47.request);
                        return [2 /*return*/, {
                                success: (_b = error_47 === null || error_47 === void 0 ? void 0 : error_47.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_47 === null || error_47 === void 0 ? void 0 : error_47.request,
                                status: error_47.response ? error_47.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShipmentOperation.prototype.addOrdersToShipment = function (dto, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_48;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/order/add"), dto, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_48 = _c.sent();
                        console.log("Error adding orders to shipment: ", (_a = error_48 === null || error_48 === void 0 ? void 0 : error_48.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_48 === null || error_48 === void 0 ? void 0 : error_48.request);
                        return [2 /*return*/, {
                                success: (_b = error_48 === null || error_48 === void 0 ? void 0 : error_48.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_48 === null || error_48 === void 0 ? void 0 : error_48.request,
                                status: error_48.response ? error_48.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShipmentOperation.prototype.confirmAllOrdersInShipmentLeavingAgency = function (shipmentId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_49;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/order/confirm_leaving_agency/").concat(shipmentId), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_49 = _c.sent();
                        console.log("Error confirming orders leaving agency: ", (_a = error_49 === null || error_49 === void 0 ? void 0 : error_49.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_49 === null || error_49 === void 0 ? void 0 : error_49.request);
                        return [2 /*return*/, {
                                success: (_b = error_49 === null || error_49 === void 0 ? void 0 : error_49.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_49 === null || error_49 === void 0 ? void 0 : error_49.request,
                                status: error_49.response ? error_49.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShipmentOperation.prototype.confirmAllOrdersInShipmentEnteringAgency = function (shipmentId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_50;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/order/confirm_entering_agency/").concat(shipmentId), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_50 = _c.sent();
                        console.log("Error confirming orders entering agency: ", (_a = error_50 === null || error_50 === void 0 ? void 0 : error_50.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_50 === null || error_50 === void 0 ? void 0 : error_50.request);
                        return [2 /*return*/, {
                                success: (_b = error_50 === null || error_50 === void 0 ? void 0 : error_50.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_50 === null || error_50 === void 0 ? void 0 : error_50.request,
                                status: error_50.response ? error_50.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShipmentOperation.prototype.decompose = function (shipmentId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_51;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/decompose/").concat(shipmentId), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_51 = _c.sent();
                        console.log("Error decomposing shipment: ", (_a = error_51 === null || error_51 === void 0 ? void 0 : error_51.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_51 === null || error_51 === void 0 ? void 0 : error_51.request);
                        return [2 /*return*/, {
                                success: (_b = error_51 === null || error_51 === void 0 ? void 0 : error_51.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_51 === null || error_51 === void 0 ? void 0 : error_51.request,
                                status: error_51.response ? error_51.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShipmentOperation.prototype.search = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_52;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_52 = _c.sent();
                        console.log("Error searching shipment: ", (_a = error_52 === null || error_52 === void 0 ? void 0 : error_52.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_52 === null || error_52 === void 0 ? void 0 : error_52.request);
                        return [2 /*return*/, {
                                success: (_b = error_52 === null || error_52 === void 0 ? void 0 : error_52.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_52 === null || error_52 === void 0 ? void 0 : error_52.request,
                                status: error_52.response ? error_52.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShipmentOperation.prototype.getOrdersFromShipment = function (shipmentId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_53;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/order/get/").concat(shipmentId), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_53 = _c.sent();
                        console.log("Error fetching orders from shipment: ", (_a = error_53 === null || error_53 === void 0 ? void 0 : error_53.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_53 === null || error_53 === void 0 ? void 0 : error_53.request);
                        return [2 /*return*/, {
                                success: (_b = error_53 === null || error_53 === void 0 ? void 0 : error_53.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_53 === null || error_53 === void 0 ? void 0 : error_53.request,
                                status: error_53.response ? error_53.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ShipmentOperation;
}());
exports.ShipmentOperation = ShipmentOperation;
var ShippingBillOperation = /** @class */ (function () {
    function ShippingBillOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/shipping_bill';
    }
    ShippingBillOperation.prototype.create = function (dto, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_54;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), dto, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_54 = _c.sent();
                        console.log("Error creating shipping bill: ", (_a = error_54 === null || error_54 === void 0 ? void 0 : error_54.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_54 === null || error_54 === void 0 ? void 0 : error_54.request);
                        return [2 /*return*/, {
                                success: (_b = error_54 === null || error_54 === void 0 ? void 0 : error_54.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_54 === null || error_54 === void 0 ? void 0 : error_54.request,
                                status: error_54.response ? error_54.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShippingBillOperation.prototype.getByCustomerId = function (customerId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_55;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/customer/get"), {
                                params: { customerId: customerId },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_55 = _c.sent();
                        console.log("Error fetching shipping bill by customer: ", (_a = error_55 === null || error_55 === void 0 ? void 0 : error_55.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_55 === null || error_55 === void 0 ? void 0 : error_55.request);
                        return [2 /*return*/, {
                                success: (_b = error_55 === null || error_55 === void 0 ? void 0 : error_55.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_55 === null || error_55 === void 0 ? void 0 : error_55.request,
                                status: error_55.response ? error_55.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShippingBillOperation.prototype.search = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_56;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_56 = _c.sent();
                        console.log("Error searching shipping bills: ", (_a = error_56 === null || error_56 === void 0 ? void 0 : error_56.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_56 === null || error_56 === void 0 ? void 0 : error_56.request);
                        return [2 /*return*/, {
                                success: (_b = error_56 === null || error_56 === void 0 ? void 0 : error_56.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_56 === null || error_56 === void 0 ? void 0 : error_56.request,
                                status: error_56.response ? error_56.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ShippingBillOperation;
}());
exports.ShippingBillOperation = ShippingBillOperation;
var CustomerOperation = /** @class */ (function () {
    function CustomerOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/customer';
    }
    CustomerOperation.prototype.getInfo = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_57;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/"), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_57 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_57 === null || error_57 === void 0 ? void 0 : error_57.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_57 === null || error_57 === void 0 ? void 0 : error_57.request);
                        return [2 /*return*/, { success: (_b = error_57 === null || error_57 === void 0 ? void 0 : error_57.response) === null || _b === void 0 ? void 0 : _b.data, request: error_57 === null || error_57 === void 0 ? void 0 : error_57.request, status: error_57.response ? error_57.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CustomerOperation.prototype.update = function (dto, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_58;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update"), dto, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_58 = _c.sent();
                        console.log("Error updating customer: ", (_a = error_58 === null || error_58 === void 0 ? void 0 : error_58.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_58 === null || error_58 === void 0 ? void 0 : error_58.request);
                        return [2 /*return*/, {
                                success: (_b = error_58 === null || error_58 === void 0 ? void 0 : error_58.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_58 === null || error_58 === void 0 ? void 0 : error_58.request,
                                status: error_58.response ? error_58.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CustomerOperation.prototype.searchCustomer = function (dto, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_59;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), dto, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_59 = _c.sent();
                        console.log("Error searching customer: ", (_a = error_59 === null || error_59 === void 0 ? void 0 : error_59.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_59 === null || error_59 === void 0 ? void 0 : error_59.request);
                        return [2 /*return*/, {
                                success: (_b = error_59 === null || error_59 === void 0 ? void 0 : error_59.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_59 === null || error_59 === void 0 ? void 0 : error_59.request,
                                status: error_59.response ? error_59.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CustomerOperation;
}());
exports.CustomerOperation = CustomerOperation;
var DriverTaskOperation = /** @class */ (function () {
    function DriverTaskOperation() {
        this.baseUrl = "https://api.tdlogistics.net.vn/v3/task/driver";
    }
    DriverTaskOperation.prototype.assignTask = function (dto, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_60;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/assign"), dto, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_60 = _c.sent();
                        console.log("Error assigning task: ", (_a = error_60 === null || error_60 === void 0 ? void 0 : error_60.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_60 === null || error_60 === void 0 ? void 0 : error_60.request);
                        return [2 /*return*/, {
                                success: (_b = error_60 === null || error_60 === void 0 ? void 0 : error_60.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_60 === null || error_60 === void 0 ? void 0 : error_60.request,
                                status: error_60.response ? error_60.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DriverTaskOperation.prototype.searchTasks = function (dto, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_61;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), dto, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_61 = _c.sent();
                        console.log("Error searching tasks: ", (_a = error_61 === null || error_61 === void 0 ? void 0 : error_61.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_61 === null || error_61 === void 0 ? void 0 : error_61.request);
                        return [2 /*return*/, {
                                success: (_b = error_61 === null || error_61 === void 0 ? void 0 : error_61.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_61 === null || error_61 === void 0 ? void 0 : error_61.request,
                                status: error_61.response ? error_61.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DriverTaskOperation;
}());
exports.DriverTaskOperation = DriverTaskOperation;
var StaffOperation = /** @class */ (function () {
    function StaffOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/staff';
    }
    StaffOperation.prototype.create = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_62;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_62 = _c.sent();
                        console.log("Error creating staff: ", (_a = error_62 === null || error_62 === void 0 ? void 0 : error_62.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_62 === null || error_62 === void 0 ? void 0 : error_62.request);
                        return [2 /*return*/, { success: (_b = error_62 === null || error_62 === void 0 ? void 0 : error_62.response) === null || _b === void 0 ? void 0 : _b.data, request: error_62 === null || error_62 === void 0 ? void 0 : error_62.request, status: error_62.response ? error_62.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffOperation.prototype.search = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_63;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_63 = _c.sent();
                        console.log("Error searching staff: ", (_a = error_63 === null || error_63 === void 0 ? void 0 : error_63.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_63 === null || error_63 === void 0 ? void 0 : error_63.request);
                        return [2 /*return*/, { success: (_b = error_63 === null || error_63 === void 0 ? void 0 : error_63.response) === null || _b === void 0 ? void 0 : _b.data, request: error_63 === null || error_63 === void 0 ? void 0 : error_63.request, status: error_63.response ? error_63.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffOperation.prototype.getInfo = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_64;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/"), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_64 = _c.sent();
                        console.log("Error fetching staff info: ", (_a = error_64 === null || error_64 === void 0 ? void 0 : error_64.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_64 === null || error_64 === void 0 ? void 0 : error_64.request);
                        return [2 /*return*/, { success: (_b = error_64 === null || error_64 === void 0 ? void 0 : error_64.response) === null || _b === void 0 ? void 0 : _b.data, request: error_64 === null || error_64 === void 0 ? void 0 : error_64.request, status: error_64.response ? error_64.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffOperation.prototype.update = function (id, dto, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_65;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update/").concat(id), dto, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_65 = _c.sent();
                        console.log("Error updating staff: ", (_a = error_65 === null || error_65 === void 0 ? void 0 : error_65.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_65 === null || error_65 === void 0 ? void 0 : error_65.request);
                        return [2 /*return*/, { success: (_b = error_65 === null || error_65 === void 0 ? void 0 : error_65.response) === null || _b === void 0 ? void 0 : _b.data, request: error_65 === null || error_65 === void 0 ? void 0 : error_65.request, status: error_65.response ? error_65.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffOperation.prototype.updateShipperStatus = function (dto, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_66;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/status/update"), dto, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_66 = _c.sent();
                        console.log("Error updating shipper status: ", (_a = error_66 === null || error_66 === void 0 ? void 0 : error_66.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_66 === null || error_66 === void 0 ? void 0 : error_66.request);
                        return [2 /*return*/, { success: (_b = error_66 === null || error_66 === void 0 ? void 0 : error_66.response) === null || _b === void 0 ? void 0 : _b.data, request: error_66 === null || error_66 === void 0 ? void 0 : error_66.request, status: error_66.response ? error_66.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffOperation.prototype.searchByName = function (name, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_67;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/search_by_name/").concat(name), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_67 = _c.sent();
                        console.log("Error searching staff by name: ", (_a = error_67 === null || error_67 === void 0 ? void 0 : error_67.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_67 === null || error_67 === void 0 ? void 0 : error_67.request);
                        return [2 /*return*/, { success: (_b = error_67 === null || error_67 === void 0 ? void 0 : error_67.response) === null || _b === void 0 ? void 0 : _b.data, request: error_67 === null || error_67 === void 0 ? void 0 : error_67.request, status: error_67.response ? error_67.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffOperation.prototype.searchByCccd = function (cccd, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_68;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/search_by_cccd/").concat(cccd), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_68 = _c.sent();
                        console.log("Error searching staff by cccd: ", (_a = error_68 === null || error_68 === void 0 ? void 0 : error_68.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_68 === null || error_68 === void 0 ? void 0 : error_68.request);
                        return [2 /*return*/, { success: (_b = error_68 === null || error_68 === void 0 ? void 0 : error_68.response) === null || _b === void 0 ? void 0 : _b.data, request: error_68 === null || error_68 === void 0 ? void 0 : error_68.request, status: error_68.response ? error_68.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffOperation.prototype.searchByRole = function (role, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_69;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/search_by_role/").concat(role), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_69 = _c.sent();
                        console.log("Error searching staff by role: ", (_a = error_69 === null || error_69 === void 0 ? void 0 : error_69.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_69 === null || error_69 === void 0 ? void 0 : error_69.request);
                        return [2 /*return*/, { success: (_b = error_69 === null || error_69 === void 0 ? void 0 : error_69.response) === null || _b === void 0 ? void 0 : _b.data, request: error_69 === null || error_69 === void 0 ? void 0 : error_69.request, status: error_69.response ? error_69.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffOperation.prototype.getShipperExtendedInfo = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_70;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipper/get_extended_info/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_70 = _c.sent();
                        console.log("Error fetching shipper extended info: ", (_a = error_70 === null || error_70 === void 0 ? void 0 : error_70.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_70 === null || error_70 === void 0 ? void 0 : error_70.request);
                        return [2 /*return*/, { success: (_b = error_70 === null || error_70 === void 0 ? void 0 : error_70.response) === null || _b === void 0 ? void 0 : _b.data, request: error_70 === null || error_70 === void 0 ? void 0 : error_70.request, status: error_70.response ? error_70.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return StaffOperation;
}());
exports.StaffOperation = StaffOperation;
var TaskOperation = /** @class */ (function () {
    function TaskOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/task';
    }
    // SHIPPER: Tìm kiếm công việc theo payload
    TaskOperation.prototype.search = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_71;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/shipper/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_71 = _c.sent();
                        console.log("Error searching tasks: ", (_a = error_71 === null || error_71 === void 0 ? void 0 : error_71.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_71 === null || error_71 === void 0 ? void 0 : error_71.request);
                        return [2 /*return*/, {
                                success: (_b = error_71 === null || error_71 === void 0 ? void 0 : error_71.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_71 === null || error_71 === void 0 ? void 0 : error_71.request,
                                status: error_71.response ? error_71.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SHIPPER: Xác nhận không tiếp nhận đơn hàng (do TIMEOUT, SHIPPER hoặc CUSTOMER_CANCELLING)
    TaskOperation.prototype.confirmTakenFail = function (id, dueTo, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_72;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipper/confirm_taken_fail"), {
                                params: { id: id, dueTo: dueTo },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_72 = _c.sent();
                        console.log("Error confirming taken fail: ", (_a = error_72 === null || error_72 === void 0 ? void 0 : error_72.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_72 === null || error_72 === void 0 ? void 0 : error_72.request);
                        return [2 /*return*/, {
                                success: (_b = error_72 === null || error_72 === void 0 ? void 0 : error_72.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_72 === null || error_72 === void 0 ? void 0 : error_72.request,
                                status: error_72.response ? error_72.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SHIPPER: Xác nhận đã tiếp nhận đơn hàng thành công
    TaskOperation.prototype.confirmTakenSuccess = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_73;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipper/confirm_taken_success"), {
                                params: { id: id },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_73 = _c.sent();
                        console.log("Error confirming taken success: ", (_a = error_73 === null || error_73 === void 0 ? void 0 : error_73.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_73 === null || error_73 === void 0 ? void 0 : error_73.request);
                        return [2 /*return*/, {
                                success: (_b = error_73 === null || error_73 === void 0 ? void 0 : error_73.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_73 === null || error_73 === void 0 ? void 0 : error_73.request,
                                status: error_73.response ? error_73.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SHIPPER: Xác nhận đang giao hàng
    TaskOperation.prototype.confirmDelivering = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_74;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipper/confirm_delivering"), {
                                params: { id: id },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_74 = _c.sent();
                        console.log("Error confirming delivering: ", (_a = error_74 === null || error_74 === void 0 ? void 0 : error_74.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_74 === null || error_74 === void 0 ? void 0 : error_74.request);
                        return [2 /*return*/, {
                                success: (_b = error_74 === null || error_74 === void 0 ? void 0 : error_74.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_74 === null || error_74 === void 0 ? void 0 : error_74.request,
                                status: error_74.response ? error_74.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SHIPPER: Xác nhận đã nhận hàng thành công
    TaskOperation.prototype.confirmReceived = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_75;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipper/confirm_received"), {
                                params: { id: id },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_75 = _c.sent();
                        console.log("Error confirming received: ", (_a = error_75 === null || error_75 === void 0 ? void 0 : error_75.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_75 === null || error_75 === void 0 ? void 0 : error_75.request);
                        return [2 /*return*/, {
                                success: (_b = error_75 === null || error_75 === void 0 ? void 0 : error_75.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_75 === null || error_75 === void 0 ? void 0 : error_75.request,
                                status: error_75.response ? error_75.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SHIPPER: Thêm node vào hành trình (journey) của đơn hàng
    TaskOperation.prototype.addJourneyNode = function (journeyNodeId, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_76;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/shipper/journey/add"), payload, {
                                params: { id: journeyNodeId },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_76 = _c.sent();
                        console.log("Error adding journey node: ", (_a = error_76 === null || error_76 === void 0 ? void 0 : error_76.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_76 === null || error_76 === void 0 ? void 0 : error_76.request);
                        return [2 /*return*/, {
                                success: (_b = error_76 === null || error_76 === void 0 ? void 0 : error_76.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_76 === null || error_76 === void 0 ? void 0 : error_76.request,
                                status: error_76.response ? error_76.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SHIPPER: Lấy thông tin hành trình của đơn hàng
    TaskOperation.prototype.getJourneyNode = function (journeyNodeId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_77;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipper/journey/get"), {
                                params: { id: journeyNodeId },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_77 = _c.sent();
                        console.log("Error getting journey node: ", (_a = error_77 === null || error_77 === void 0 ? void 0 : error_77.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_77 === null || error_77 === void 0 ? void 0 : error_77.request);
                        return [2 /*return*/, {
                                success: (_b = error_77 === null || error_77 === void 0 ? void 0 : error_77.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_77 === null || error_77 === void 0 ? void 0 : error_77.request,
                                status: error_77.response ? error_77.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskOperation.prototype.assignTaskToShipper = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_78;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/shipper/assign"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_78 = _c.sent();
                        console.log("Error assigning task to shipper: ", (_a = error_78 === null || error_78 === void 0 ? void 0 : error_78.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_78 === null || error_78 === void 0 ? void 0 : error_78.request);
                        return [2 /*return*/, {
                                success: (_b = error_78 === null || error_78 === void 0 ? void 0 : error_78.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_78 === null || error_78 === void 0 ? void 0 : error_78.request,
                                status: error_78.response ? error_78.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // AGENCY: Cập nhật thông tin công việc
    TaskOperation.prototype.updateTask = function (id, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_79;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/shipper/update/").concat(id), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_79 = _c.sent();
                        console.log("Error updating task: ", (_a = error_79 === null || error_79 === void 0 ? void 0 : error_79.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_79 === null || error_79 === void 0 ? void 0 : error_79.request);
                        return [2 /*return*/, {
                                success: (_b = error_79 === null || error_79 === void 0 ? void 0 : error_79.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_79 === null || error_79 === void 0 ? void 0 : error_79.request,
                                status: error_79.response ? error_79.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // AGENCY: Xóa công việc
    TaskOperation.prototype.deleteTask = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_80;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/shipper/delete/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_80 = _c.sent();
                        console.log("Error deleting task: ", (_a = error_80 === null || error_80 === void 0 ? void 0 : error_80.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_80 === null || error_80 === void 0 ? void 0 : error_80.request);
                        return [2 /*return*/, {
                                success: (_b = error_80 === null || error_80 === void 0 ? void 0 : error_80.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_80 === null || error_80 === void 0 ? void 0 : error_80.request,
                                status: error_80.response ? error_80.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // AGENCY: Xác nhận công việc hoàn thành
    TaskOperation.prototype.confirmCompletedTask = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_81;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipper/completed/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_81 = _c.sent();
                        console.log("Error confirming completed task: ", (_a = error_81 === null || error_81 === void 0 ? void 0 : error_81.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_81 === null || error_81 === void 0 ? void 0 : error_81.request);
                        return [2 /*return*/, {
                                success: (_b = error_81 === null || error_81 === void 0 ? void 0 : error_81.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_81 === null || error_81 === void 0 ? void 0 : error_81.request,
                                status: error_81.response ? error_81.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Tìm kiếm công việc theo trạng thái hoàn thành (completed)
    TaskOperation.prototype.searchByCompleted = function (completed, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_82;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipper/search_by_completed/").concat(completed), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_82 = _c.sent();
                        console.log("Error searching tasks by completed status: ", (_a = error_82 === null || error_82 === void 0 ? void 0 : error_82.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_82 === null || error_82 === void 0 ? void 0 : error_82.request);
                        return [2 /*return*/, {
                                success: (_b = error_82 === null || error_82 === void 0 ? void 0 : error_82.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_82 === null || error_82 === void 0 ? void 0 : error_82.request,
                                status: error_82.response ? error_82.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Tìm kiếm công việc theo tên shipper
    TaskOperation.prototype.searchByShipperName = function (shipperName, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_83;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipper/search_by_shipper_name/").concat(shipperName), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_83 = _c.sent();
                        console.log("Error searching tasks by shipper name: ", (_a = error_83 === null || error_83 === void 0 ? void 0 : error_83.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_83 === null || error_83 === void 0 ? void 0 : error_83.request);
                        return [2 /*return*/, {
                                success: (_b = error_83 === null || error_83 === void 0 ? void 0 : error_83.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_83 === null || error_83 === void 0 ? void 0 : error_83.request,
                                status: error_83.response ? error_83.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Tìm kiếm công việc theo orderId
    TaskOperation.prototype.searchByOrderId = function (orderId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_84;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipper/search_by_order_id/").concat(orderId), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_84 = _c.sent();
                        console.log("Error searching tasks by order ID: ", (_a = error_84 === null || error_84 === void 0 ? void 0 : error_84.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_84 === null || error_84 === void 0 ? void 0 : error_84.request);
                        return [2 /*return*/, {
                                success: (_b = error_84 === null || error_84 === void 0 ? void 0 : error_84.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_84 === null || error_84 === void 0 ? void 0 : error_84.request,
                                status: error_84.response ? error_84.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TaskOperation;
}());
exports.TaskOperation = TaskOperation;
var VoucherOperation = /** @class */ (function () {
    function VoucherOperation() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/voucher';
    }
    VoucherOperation.prototype.create = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_85;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_85 = _c.sent();
                        console.log("Error creating voucher: ", (_a = error_85 === null || error_85 === void 0 ? void 0 : error_85.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_85 === null || error_85 === void 0 ? void 0 : error_85.request);
                        return [2 /*return*/, { success: (_b = error_85 === null || error_85 === void 0 ? void 0 : error_85.response) === null || _b === void 0 ? void 0 : _b.data, request: error_85 === null || error_85 === void 0 ? void 0 : error_85.request, status: error_85.response ? error_85.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VoucherOperation.prototype.getVouchersByCustomer = function (page, size, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_86;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get"), {
                                params: {
                                    page: page,
                                    size: size
                                },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_86 = _c.sent();
                        console.log("Error fetching vouchers: ", (_a = error_86 === null || error_86 === void 0 ? void 0 : error_86.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_86 === null || error_86 === void 0 ? void 0 : error_86.request);
                        return [2 /*return*/, { success: (_b = error_86 === null || error_86 === void 0 ? void 0 : error_86.response) === null || _b === void 0 ? void 0 : _b.data, request: error_86 === null || error_86 === void 0 ? void 0 : error_86.request, status: error_86.response ? error_86.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VoucherOperation.prototype.search = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_87;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_87 = _c.sent();
                        console.log("Error searching vouchers: ", (_a = error_87 === null || error_87 === void 0 ? void 0 : error_87.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_87 === null || error_87 === void 0 ? void 0 : error_87.request);
                        return [2 /*return*/, { success: (_b = error_87 === null || error_87 === void 0 ? void 0 : error_87.response) === null || _b === void 0 ? void 0 : _b.data, request: error_87 === null || error_87 === void 0 ? void 0 : error_87.request, status: error_87.response ? error_87.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return VoucherOperation;
}());
exports.VoucherOperation = VoucherOperation;
