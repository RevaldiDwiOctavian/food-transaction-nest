import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FoodService {
  constructor(private readonly prismaService: PrismaService) {}

  createFood(dto: CreateFoodDto) {
    return this.prismaService.food.create({
      data: {
        food_name: dto.foodName,
        description: dto.description,
        price: dto.price,
      },
    });
  }

  getFoods() {
    return this.prismaService.food.findMany();
  }

  getFood(foodId: number) {
    return this.prismaService.food.findUnique({
      where: {
        food_id: foodId,
      },
    });
  }

  updateFood(foodId: number, dto: CreateFoodDto) {
    return this.prismaService.food.update({
      data: {
        food_name: dto.foodName,
        description: dto.description,
        price: dto.price,
      },
      where: {
        food_id: foodId,
      },
    });
  }

  deleteFood(foodId: number) {
    return this.prismaService.food.delete({
      where: {
        food_id: foodId,
      },
    });
  }
}
