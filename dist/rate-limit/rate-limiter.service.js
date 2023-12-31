"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiterService = void 0;
const common_1 = require("@nestjs/common");
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
let RateLimiterService = class RateLimiterService {
    constructor() {
        this.rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
            points: 100,
            duration: 15 * 60,
        });
    }
    async consume(ip) {
        return this.rateLimiter.consume(ip);
    }
    ratelimit() {
        return async (req, res, next) => {
            try {
                await this.consume(req.ip);
                next();
            }
            catch (err) {
                res.status(429).send('Terlalu banyak request untuk saat ini, silahkan coba lagi nanti');
            }
        };
    }
};
exports.RateLimiterService = RateLimiterService;
exports.RateLimiterService = RateLimiterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RateLimiterService);
//# sourceMappingURL=rate-limiter.service.js.map