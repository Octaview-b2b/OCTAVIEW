"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const candidateSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    DOB: { type: String, required: true },
    linkedin: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    github: { type: String, required: true },
    status: { type: Object },
    resumeUrl: { type: String, required: true },
    selection: { type: Boolean, default: false },
    jobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Job", required: true }, // Link to job
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true }, // Link to employer
}, { timestamps: true });
const CandidateModel = mongoose_1.default.model('Candidate', candidateSchema);
exports.default = CandidateModel;
