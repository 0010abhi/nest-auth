import { Controller, Post, Get, Body, Request } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {}
    
    // @HttpCode(HttpStatus.OK)
    @Post('create')
    create(@Body() blogDto: any) {
      return this.blogService.createBlog(blogDto);
    }

    @Post('update')
    update(@Body() blogDto: any) {
      return this.blogService.updateBlog(blogDto);
    }
  
    // @UseGuards(AuthGuard)
    @Get('')
    getAll(@Request() req: any) {
      console.log('>>> get profile', req);
      return this.blogService.getAllBlogs();
    }

    @Post('trash')
    moveToTrash(@Body() req: any) {
      console.log('>>> get profile', req);
    //   return this.authService.profile(req.user);
    }
}
