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
exports.ResourceController = void 0;
const resource_1 = require("../models/resource");
class ResourceController {
    // Create a new resource
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description } = req.body;
                if (!name) {
                    res.status(400).json({ error: 'Name is required' });
                    return;
                }
                const resource = new resource_1.ResourceModel({ name, description });
                const created = yield resource.save();
                res.status(201).json(created);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to create resource' });
            }
        });
    }
    // List resources with optional filtering by name
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = {};
                if (req.query.name) {
                    filter.name = { $regex: req.query.name, $options: 'i' };
                }
                const resources = yield resource_1.ResourceModel.find(filter);
                res.json(resources);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch resources' });
            }
        });
    }
    // Get resource details by ID
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resource = yield resource_1.ResourceModel.findById(req.params.id);
                if (!resource) {
                    res.status(404).json({ error: 'Resource not found' });
                    return;
                }
                res.json(resource);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch resource' });
            }
        });
    }
    // Update resource details by ID
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description } = req.body;
                const updatedResource = yield resource_1.ResourceModel.findByIdAndUpdate(req.params.id, { name, description }, { new: true, runValidators: true });
                if (!updatedResource) {
                    res.status(404).json({ error: 'Resource not found' });
                    return;
                }
                res.json(updatedResource);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to update resource' });
            }
        });
    }
    // Delete a resource by ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedResource = yield resource_1.ResourceModel.findByIdAndDelete(req.params.id);
                if (!deletedResource) {
                    res.status(404).json({ error: 'Resource not found' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to delete resource' });
            }
        });
    }
}
exports.ResourceController = ResourceController;
