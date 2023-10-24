import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../config/jwt/constant';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '10m' },
        }),
    ],
    providers: [],
    controllers: [],
    exports: [],
})
export class AuthModule {}
