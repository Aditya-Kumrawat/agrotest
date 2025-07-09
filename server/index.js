"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const app_1 = require("./app");
Object.defineProperty(exports, "createServer", { enumerable: true, get: function () { return app_1.createServer; } });
if (require.main === module) {
    const app = (0, app_1.createServer)();
    const PORT = Number(process.env.PORT) || 3000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`AgroSaarthi Backend running on port ${PORT}`);
    });
}
