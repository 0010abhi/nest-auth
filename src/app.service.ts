import { Injectable } from '@nestjs/common';
const Redis = require("ioredis");
const redis = new Redis();

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    const value = await redis.get("demokey");

    if (value) {
      return value;
    }
    return 'Hello World!';
    // redis.get("demokey", (err: any, result: any) => {
    //   console.log('hello??')
    //   if (err) {
    //     console.error(err);
    //     return 'Hello World!';
    //   } else {
    //     const val = 'Hello World - ' + result;
    //     console.log('hello val', val);

    //   }
    // });
  }
}
