"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceModel = void 0;
const mongoose_1 = require("mongoose");
const resourceSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' }
});
exports.ResourceModel = (0, mongoose_1.model)('Resource', resourceSchema);
