import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,  ValidationPipe, UsePipes, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoriesService } from '../shared/categories/categories.service';
import { Category } from '../shared/categories/category.entity';
import { CategoryDto } from '../shared/categories/category.dto';

@Controller('admin/categories')
@UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted:true, transform:true}))
export class CategoriesController {
    constructor(private categoriesService: CategoriesService){}

    @Get()
    readCategories(): Promise<Category[]>{
        return this.categoriesService.readAll();
    }

    @Get(":id")
    readCategory(@Param('id', ParseIntPipe) id:number): Promise<Category>{
        return this.categoriesService.readOne(id);
    }
 
    @Post()
    createCategory(@Body() categoryDto: CategoryDto):Promise<Category>{
        return  this.categoriesService.create(categoryDto);
    }

    @Put(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    updateCategory(@Param('id', ParseIntPipe) id: number,
        @Body() categoryDto: CategoryDto): Promise<void>{
        return this.categoriesService.update(id, categoryDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.categoriesService.delete(id);
    }
}
