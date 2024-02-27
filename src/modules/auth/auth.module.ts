import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
console.log('>>> auth module', process.env.JWT_SECRET);

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'My Secret',
      signOptions: { expiresIn: '1200s' },
    }),
    UsersModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})

export class AuthModule { }