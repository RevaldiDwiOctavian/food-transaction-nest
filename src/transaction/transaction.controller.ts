import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from '@prisma/client';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getCustomers(): Promise<Transaction[]> {
    return this.transactionService.getTransactions();
  }

  @Get('/:transactionId')
  async getCustomer(
    @Param('transactionId') transactionId: string,
  ): Promise<Transaction> {
    return this.transactionService.getTransaction(+transactionId);
  }

  @Post()
  async createCustomer(
    @Body() dto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(dto);
  }

  @Put('/:transactionId')
  async updateCustomer(
    @Param('transactionId') transactionId: string,
    @Body() dto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.updateTransaction(+transactionId, dto);
  }

  @Delete('/:transactionId')
  async deleteCustomer(
    @Param('transactionId') transactionId: string,
  ): Promise<Transaction> {
    return this.transactionService.deleteTransaction(+transactionId);
  }
}
