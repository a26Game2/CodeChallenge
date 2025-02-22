"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResourceRoutes = createResourceRoutes;
const express_1 = require("express");
function createResourceRoutes(controller) {
    const router = (0, express_1.Router)();
    router.post('/', controller.create.bind(controller));
    router.get('/', controller.list.bind(controller));
    router.get('/:id', controller.get.bind(controller));
    router.put('/:id', controller.update.bind(controller));
    router.delete('/:id', controller.delete.bind(controller));
    return router;
}
