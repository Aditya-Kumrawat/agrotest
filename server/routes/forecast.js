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
const axios_1 = __importDefault(require("axios"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get weather forecast and disease risk
router.get('/', auth_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lat, lng } = req.query;
        if (!lat || !lng) {
            return res.status(400).json({ error: 'Latitude and longitude required' });
        }
        // Fetch weather data from Open-Meteo
        const weatherResponse = yield axios_1.default.get(`https://api.open-meteo.com/v1/forecast`, {
            params: {
                latitude: lat,
                longitude: lng,
                daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,humidity_relative_2m_mean',
                forecast_days: 7
            }
        });
        const weatherData = weatherResponse.data.daily;
        const forecast = [];
        for (let i = 0; i < 7; i++) {
            const date = weatherData.time[i];
            const maxTemp = weatherData.temperature_2m_max[i];
            const minTemp = weatherData.temperature_2m_min[i];
            const precipitation = weatherData.precipitation_sum[i];
            const humidity = weatherData.humidity_relative_2m_mean[i];
            const riskLevel = calculateDiseaseRisk(maxTemp, minTemp, precipitation, humidity);
            const preventiveActions = getPreventiveActions(riskLevel);
            forecast.push({
                date,
                maxTemp,
                minTemp,
                precipitation,
                humidity,
                riskLevel,
                preventiveActions
            });
        }
        res.json({ forecast });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}));
function calculateDiseaseRisk(maxTemp, minTemp, precipitation, humidity) {
    // Simple disease risk calculation based on weather conditions
    let riskScore = 0;
    // High humidity increases risk
    if (humidity > 80)
        riskScore += 3;
    else if (humidity > 60)
        riskScore += 2;
    else if (humidity > 40)
        riskScore += 1;
    // Moderate temperatures with moisture increase risk
    if (maxTemp > 20 && maxTemp < 30 && precipitation > 5)
        riskScore += 2;
    // High precipitation increases risk
    if (precipitation > 10)
        riskScore += 2;
    else if (precipitation > 5)
        riskScore += 1;
    if (riskScore >= 5)
        return 'High';
    if (riskScore >= 3)
        return 'Medium';
    return 'Low';
}
function getPreventiveActions(riskLevel) {
    switch (riskLevel) {
        case 'High':
            return [
                'Apply preventive fungicide spray',
                'Improve field drainage',
                'Increase air circulation',
                'Monitor crops twice daily'
            ];
        case 'Medium':
            return [
                'Monitor crops daily',
                'Ensure proper spacing',
                'Apply organic preventive treatments'
            ];
        default:
            return [
                'Continue regular monitoring',
                'Maintain good field hygiene'
            ];
    }
}
exports.default = router;
