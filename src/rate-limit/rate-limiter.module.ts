import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RateLimiterService } from './rate-limiter.service';

@Module({
    providers: [RateLimiterService],
    exports: [RateLimiterService],
})
export class RateLimiterModule {
    constructor(private rateLimiterService: RateLimiterService) {}

    configure(consumer: MiddlewareConsumer) { // 👈 new method to configure
        consumer
            .apply(this.rateLimiterService.ratelimit())
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
