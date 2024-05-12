import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AddCategoryDto } from './dto/addCategory.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  @Post()
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe())
  async addCategories(@Body() data: AddCategoryDto) {
    const category = await this.categoriesService.addCategories(data);
    return category;
  }
}
