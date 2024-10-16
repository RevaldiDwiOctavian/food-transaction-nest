import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { PrismaModule } from './prisma/prisma.module';
import { FoodModule } from './food/food.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [CustomerModule, PrismaModule, FoodModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
