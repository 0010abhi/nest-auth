import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareHashedString, createHashedString } from 'src/utils/bcrypt';
import { User } from 'src/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user: any = await this.usersService.findOne(username);
    console.log('>>> user in sign in', user);
    const isPasswordMatch = await compareHashedString(pass, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    data: any): Promise<any> {
    const hashedPassword = await createHashedString(data.password);
    const dataToSave = {
      ...data,
      password: hashedPassword
    }
    const user = await this.usersService.create(dataToSave);

    console.log('User created', user);
  }

  async profile(user: any): Promise<{ data: User }> {
    console.log('>>> profile servuce', user.id);
    const userFound: any = await this.usersService.findOneById(user.sub);
    console.log('>>> auth service profile', userFound);
    return {
      data: userFound,
    };
  }
}