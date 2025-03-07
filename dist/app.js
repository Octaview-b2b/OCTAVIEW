"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./app/routers/index"));
const mongodb_contact_data_source_1 = require("./infrastructure/data-sources/mongodb/mongodb-contact-data-source");
const dotenv_1 = __importDefault(require("dotenv"));
const signaling_1 = require("./infrastructure/websocket/signaling");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app); // Attach HTTP server for WebSocket
(0, signaling_1.initWebSocketServer)(server);
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api", index_1.default);
app.use((err, _req, res) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});
(async () => {
    try {
        await (0, mongodb_contact_data_source_1.connectDb)();
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    }
})();
exports.default = app;
