import { MiddlewareConsumer } from '@nestjs/common';
import { RateLimiterService } from './rate-limiter.service';
export declare class RateLimiterModule {
    private rateLimiterService;
    constructor(rateLimiterService: RateLimiterService);
    configure(consumer: MiddlewareConsumer): void;
}
