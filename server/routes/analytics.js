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
// Get analytics data
router.get('/', auth_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        // TODO: Replace all supabase DB queries with MySQL queries
        // Get diseases detected this week
        const weeklyDiseases = [];
        // Get all user scans for field health score
        const allScans = [];
        const healthyCount = (allScans === null || allScans === void 0 ? void 0 : allScans.filter(scan => scan.is_healthy).length) || 0;
        const totalScans = (allScans === null || allScans === void 0 ? void 0 : allScans.length) || 0;
        const fieldHealthScore = totalScans > 0 ? Math.round((healthyCount / totalScans) * 100) : 100;
        // Get weekly scan counts for graph
        const weeklyData = yield getWeeklyScanData(req.user.id);
        // Get disease breakdown
        const diseaseBreakdown = yield getDiseaseBreakdown(req.user.id);
        res.json({
            diseasesThisWeek: (weeklyDiseases === null || weeklyDiseases === void 0 ? void 0 : weeklyDiseases.length) || 0,
            fieldHealthScore,
            weeklyData,
            diseaseBreakdown,
            totalScans,
            healthyScans: healthyCount
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
function getWeeklyScanData(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
            const startOfDay = new Date(date.setHours(0, 0, 0, 0)).toISOString();
            const endOfDay = new Date(date.setHours(23, 59, 59, 999)).toISOString();
            // TODO: Replace all supabase DB queries with MySQL queries
            const count = 0;
            data.push({
                date: date.toISOString().split('T')[0],
                scans: count || 0
            });
        }
        return data;
    });
}
function getDiseaseBreakdown(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: Replace all supabase DB queries with MySQL queries
        const data = [];
        const breakdown = {};
        data === null || data === void 0 ? void 0 : data.forEach(scan => {
            breakdown[scan.ai_result] = (breakdown[scan.ai_result] || 0) + 1;
        });
        return Object.entries(breakdown).map(([disease, count]) => ({
            disease,
            count
        }));
    });
}
exports.default = router;
