import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  create(@Body() dto: CreateFoodDto) {
    return this.foodService.createFood(dto);
  }

  @Get()
  findAll() {
    return this.foodService.getFoods();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.foodService.getFood(+id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: CreateFoodDto) {
    return this.foodService.updateFood(+id, dto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.foodService.deleteFood(+id);
  }
}
