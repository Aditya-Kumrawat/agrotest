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
const express_1 = require("express");
const mysql_1 = __importDefault(require("../config/mysql"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Missing email or password' });
        }
        // Find user
        const [rows] = yield mysql_1.default.query('SELECT * FROM profiles WHERE email = ?', [email]);
        const user = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Check password
        const valid = yield bcryptjs_1.default.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, phone: user.phone } });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// Signup
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name, phone } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Check if user exists
        const [existing] = yield mysql_1.default.query('SELECT id FROM profiles WHERE email = ?', [email]);
        if (Array.isArray(existing) && existing.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        // Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Insert user
        yield mysql_1.default.query('INSERT INTO profiles (name, email, password, phone) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, phone || null]);
        return res.json({ message: 'Signup successful' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// Signin
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Missing email or password' });
        }
        // Find user
        const [rows] = yield mysql_1.default.query('SELECT * FROM profiles WHERE email = ?', [email]);
        const user = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Check password
        const valid = yield bcryptjs_1.default.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, phone: user.phone } });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// Signout (client should just delete token)
router.post('/signout', (req, res) => {
    res.json({ message: 'Signed out successfully (client should delete token)' });
});
exports.default = router;
