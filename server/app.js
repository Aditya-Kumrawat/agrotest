"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = createServer;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Import routes
const auth_1 = __importDefault(require("./routes/auth"));
const crops_1 = __importDefault(require("./routes/crops"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const community_1 = __importDefault(require("./routes/community"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const forecast_1 = __importDefault(require("./routes/forecast"));
const chatbot_1 = __importDefault(require("./routes/chatbot"));
const demoRoute_1 = __importDefault(require("./routes/demoRoute"));
dotenv_1.default.config();
function createServer() {
    const app = (0, express_1.default)();
    const PORT = Number(process.env.PORT) || 3000;
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use('/api/auth', auth_1.default);
    app.use('/api/crops', crops_1.default);
    app.use('/api/dashboard', dashboard_1.default);
    app.use('/api/community', community_1.default);
    app.use('/api/analytics', analytics_1.default);
    app.use('/api/forecast', forecast_1.default);
    app.use('/api/chatbot', chatbot_1.default);
    app.use('/api/demo', demoRoute_1.default);
    app.get('/api/health', (req, res) => {
        res.json({ status: 'OK', timestamp: new Date().toISOString() });
    });
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Something went wrong!' });
    });
    return app;
}
if (require.main === module) {
    const app = createServer();
    const PORT = Number(process.env.PORT) || 3000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`AgroSaarthi Backend running on port ${PORT}`);
    });
}
