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
exports.RateLimiterModule = void 0;
const common_1 = require("@nestjs/common");
const rate_limiter_service_1 = require("./rate-limiter.service");
let RateLimiterModule = class RateLimiterModule {
    constructor(rateLimiterService) {
        this.rateLimiterService = rateLimiterService;
    }
    configure(consumer) {
        consumer
            .apply(this.rateLimiterService.ratelimit())
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.RateLimiterModule = RateLimiterModule;
exports.RateLimiterModule = RateLimiterModule = __decorate([
    (0, common_1.Module)({
        providers: [rate_limiter_service_1.RateLimiterService],
        exports: [rate_limiter_service_1.RateLimiterService],
    }),
    __metadata("design:paramtypes", [rate_limiter_service_1.RateLimiterService])
], RateLimiterModule);
//# sourceMappingURL=rate-limiter.module.js.map