import { Request, Response, NextFunction } from 'express';
export declare class RateLimiterService {
    private readonly rateLimiter;
    constructor();
    consume(ip: string): Promise<import("rate-limiter-flexible").RateLimiterRes>;
    middleware(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
