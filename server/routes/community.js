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
const express_1 = require("express");
// import { supabase } from '../config/supabase'
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get all posts
router.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Replace all supabase DB queries with MySQL queries
        res.json({ posts: [] }); // Placeholder
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// Create new post
router.post('/posts', auth_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, category } = req.body;
        // TODO: Replace all supabase DB queries with MySQL queries
        res.json({ post: {} }); // Placeholder
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// Add comment to post
router.post('/posts/:id/comments', auth_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { content } = req.body;
        // TODO: Replace all supabase DB queries with MySQL queries
        res.json({ comment: {} }); // Placeholder
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
exports.default = router;
