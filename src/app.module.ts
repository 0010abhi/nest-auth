import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// NestJs Modules
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

//Entities
import { User } from './entity/user.entity';
import { Blog } from './entity/blog.entity';
import { BlogModule } from './blog/blog.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root1234',
      database: 'nestjs_auth',
      entities: [User, Blog],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    BlogModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
