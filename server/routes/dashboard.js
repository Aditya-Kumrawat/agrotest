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
// Get dashboard data
router.get('/', auth_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Replace all supabase DB queries with MySQL queries
        // Get crop count
        const cropCount = 0; // Placeholder
        // Get latest scan
        const latestScan = null; // Placeholder
        // Calculate disease risk
        const diseaseCount = 0; // Placeholder
        const totalScans = 0; // Placeholder
        const riskLevel = calculateRiskLevel(diseaseCount, totalScans);
        // Get local disease map data
        const diseaseMap = yield getLocalDiseaseMap();
        // Get crop calendar
        const cropCalendar = getCropCalendar();
        res.json({
            cropCount: cropCount || 0,
            riskLevel,
            latestScan,
            diseaseMap,
            cropCalendar,
            stats: {
                totalScans,
                healthyScans: totalScans - diseaseCount,
                diseaseScans: diseaseCount
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
function calculateRiskLevel(diseaseCount, totalScans) {
    if (totalScans === 0)
        return 'Low';
    const ratio = diseaseCount / totalScans;
    if (ratio >= 0.5)
        return 'High';
    if (ratio >= 0.3)
        return 'Medium';
    return 'Low';
}
function getLocalDiseaseMap() {
    return __awaiter(this, void 0, void 0, function* () {
        // Simulate local disease data
        return [
            { lat: 28.6139, lng: 77.2090, severity: 'High', disease: 'Leaf Blight' },
            { lat: 28.6169, lng: 77.2060, severity: 'Medium', disease: 'Powdery Mildew' },
            { lat: 28.6109, lng: 77.2120, severity: 'Low', disease: 'Rust' }
        ];
    });
}
function getCropCalendar() {
    return [
        { crop: 'Wheat', stage: 'Growth', daysRemaining: 45 },
        { crop: 'Rice', stage: 'Planting', daysRemaining: 15 },
        { crop: 'Maize', stage: 'Harvest', daysRemaining: 7 }
    ];
}
exports.default = router;
