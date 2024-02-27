import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/entity/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private blogRepository: Repository<Blog>
    ) { }

    async createBlog(data: any): Promise<any> {
        return this.blogRepository.save(data);
    }

    async updateBlog(data: any): Promise<any> {
        const blog: any = await this.blogRepository.findOneBy({ id: data.id });
        blog.content = data.content;
        console.log('>>> to update', blog, data);
        return this.blogRepository.save(blog);
    }

    async getAllBlogs(): Promise<any> {
        return this.blogRepository.find();
    }
}
