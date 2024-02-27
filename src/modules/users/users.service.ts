import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email: username });
  }

  async findOneById(id: any): Promise<User | null> {
    // Lib Error Check: https://stackoverflow.com/questions/53455552/typeorm-findone-returns-unexpected-value
    if(id) {
      const userFound: any = await this.usersRepository.findOneBy({ id: id });
      console.log('>>> yo', userFound);
      return userFound
    } else {
      throw new UnauthorizedException();
    }
    
  }

  async create(data: any): Promise<any> {
    return this.usersRepository.save(data);
  }

}