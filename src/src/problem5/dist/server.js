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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./config/database");
const resourceController_1 = require("./controllers/resourceController");
const resourceRoutes_1 = require("./routes/resourceRoutes");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connectDb)();
    const resourceController = new resourceController_1.ResourceController();
    const resourceRoutes = (0, resourceRoutes_1.createResourceRoutes)(resourceController);
    app.use('/resources', resourceRoutes);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}))();
