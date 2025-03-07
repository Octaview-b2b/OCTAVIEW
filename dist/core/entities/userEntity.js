"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpEntity = exports.UserEntity = void 0;
class UserEntity {
    constructor(id, email, password, companyName) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.companyName = companyName;
    }
}
exports.UserEntity = UserEntity;
class OtpEntity {
    constructor(email, otp, expiry) {
        this.email = email;
        this.otp = otp;
        this.expiry = expiry;
    }
}
exports.OtpEntity = OtpEntity;
