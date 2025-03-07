"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meet_Controllers_1 = require("../../controllers/user/meet_Controllers");
const meetRouter = (0, express_1.Router)();
meetRouter.post('/send-meeting-invite', async (req, res) => { await meet_Controllers_1.MeetController.sendLink(req, res); });
meetRouter.post("/compile", async (req, res) => { await meet_Controllers_1.MeetController.executeCode(req, res); });
exports.default = meetRouter;
