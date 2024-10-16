import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from '@prisma/client';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTransaction(dto: CreateTransactionDto): Promise<Transaction> {
    const foodTotalPrice = await this.prismaService.food
      .findUnique({
        where: {
          food_id: dto.foodId,
        },
      })
      .then((i) => {
        return i.price.times(dto.quantity);
      });

    return this.prismaService.transaction.create({
      data: {
        customer_id: dto.customerId,
        food_id: dto.foodId,
        quantity: dto.quantity,
        total_price: foodTotalPrice,
      },
    });
  }

  async updateTransaction(
    transactionId: number,
    dto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        transaction_id: transactionId,
      },
    });

    if (!transaction) {
      throw new HttpException('Transaction Not Found', HttpStatus.NOT_FOUND);
    }

    const foodTotalPrice = await this.prismaService.food
      .findUnique({
        where: {
          food_id: dto.foodId,
        },
      })
      .then((i) => {
        return i.price.times(dto.quantity);
      });

    return this.prismaService.transaction.update({
      data: {
        customer_id: transaction.customer_id,
        food_id: dto.foodId,
        quantity: dto.quantity,
        total_price: foodTotalPrice,
      },
      where: {
        transaction_id: transactionId,
      },
    });
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.prismaService.transaction.findMany({
      include: {
        customer: true,
        food: true,
      },
    });
  }

  async getTransaction(transactionId: number): Promise<Transaction> {
    return this.prismaService.transaction.findUnique({
      where: {
        transaction_id: transactionId,
      },
      include: {
        customer: true,
        food: true,
      },
    });
  }

  async deleteTransaction(transactionId: number): Promise<Transaction> {
    return this.prismaService.transaction.delete({
      where: {
        transaction_id: transactionId,
      },
    });
  }
}
