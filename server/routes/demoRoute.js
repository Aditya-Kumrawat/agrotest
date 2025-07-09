"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const demo_1 = require("./demo");
const router = (0, express_1.Router)();
router.get('/', demo_1.handleDemo);
exports.default = router;
