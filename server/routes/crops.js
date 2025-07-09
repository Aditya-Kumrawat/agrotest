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
// import { supabase } from '../config/supabase'
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const mysql_1 = __importDefault(require("../config/mysql"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Upload crop scan
router.post('/scan', auth_1.authenticateUser, upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cropType, location, fieldName } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No image provided' });
        }
        // TODO: Replace Supabase storage upload with S3/local storage
        // TODO: Replace Supabase DB insert with MySQL insert
        // Simulate AI diagnosis (replace with actual AI service)
        const aiResult = simulateAIDiagnosis(cropType);
        // Store scan data in database
        // const { data: scanData, error: dbError } = await supabase
        //   .from('crop_scans')
        //   .insert({
        //     user_id: req.user.id,
        //     crop_type: cropType,
        //     location,
        //     field_name: fieldName,
        //     image_url: uploadData.path,
        //     ai_result: aiResult.disease,
        //     confidence_score: aiResult.confidence,
        //     is_healthy: aiResult.disease === 'Healthy',
        //     recommendations: aiResult.recommendations
        //   })
        //   .select()
        //   .single()
        // if (dbError) {
        //   return res.status(400).json({ error: dbError.message })
        // }
        res.json({ scan: null, aiResult }); // Placeholder for scan data
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// Get scan history
router.get('/history', auth_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { disease_type, crop_type, action_taken } = req.query;
        // TODO: Replace Supabase query with MySQL query
        let query = null; // Placeholder for query
        if (disease_type) {
            // query = query.eq('ai_result', disease_type) // Placeholder for query
        }
        if (crop_type) {
            // query = query.eq('crop_type', crop_type) // Placeholder for query
        }
        if (action_taken) {
            // query = query.eq('action_taken', action_taken) // Placeholder for query
        }
        const data = []; // Placeholder for data
        // if (error) {
        //   return res.status(400).json({ error: error.message })
        // }
        res.json({ scans: data });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// Update action taken
router.patch('/scan/:id/action', auth_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { action_taken } = req.body;
        // TODO: Replace Supabase update with MySQL update
        const data = {}; // Placeholder for data
        // const { data, error } = null // Placeholder for data and error
        // if (error) {
        //   return res.status(400).json({ error: error.message })
        // }
        res.json({ scan: data });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
router.get('/profile', auth_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { payload } = req.user;
        const userId = payload.id;
        const [rows] = yield mysql_1.default.query('SELECT id, email, name, phone FROM profiles WHERE id = ?', [userId]);
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ profile: rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
function simulateAIDiagnosis(cropType) {
    const diseases = [
        'Healthy',
        'Leaf Blight',
        'Powdery Mildew',
        'Rust',
        'Bacterial Spot',
        'Viral Disease'
    ];
    const disease = diseases[Math.floor(Math.random() * diseases.length)];
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
    const recommendations = disease === 'Healthy'
        ? ['Continue current care routine', 'Monitor regularly']
        : ['Apply appropriate fungicide', 'Improve air circulation', 'Remove affected leaves'];
    return { disease, confidence, recommendations };
}
exports.default = router;
