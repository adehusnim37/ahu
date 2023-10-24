import {Injectable} from '@nestjs/common';
import {RateLimiterMemory} from 'rate-limiter-flexible';
import {Request, Response, NextFunction} from 'express';

@Injectable()
export class RateLimiterService {
    private readonly rateLimiter: RateLimiterMemory;

    constructor() {
        this.rateLimiter = new RateLimiterMemory({
            // rate limit 15 minutes per 100 requests per IP
            points: 100,
            duration: 15 * 60,
        });
    }

    public async consume(ip: string) {
        return this.rateLimiter.consume(ip);
    }

    public ratelimit() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.consume(req.ip);
                next();
            } catch (err) {
                res.status(429).send('Terlalu banyak request untuk saat ini, silahkan coba lagi nanti');
            }
        };
    }
}
