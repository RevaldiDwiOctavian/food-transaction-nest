import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CustomerService } from './customer.service';
import { Customer } from 'prisma/prisma-client';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getCustomers(): Promise<Customer[]> {
    return this.customerService.getCustomers();
  }

  @Get('/:customerId')
  async getCustomer(
    @Param('customerId') customerId: string,
  ): Promise<Customer> {
    return this.customerService.getCustomer(customerId);
  }

  @Post()
  async createCustomer(@Body() dto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.createCustomer(dto);
  }

  @Put('/:customerId')
  async updateCustomer(
    @Param('customerId') customerId: string,
    @Body() dto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.updateCustomer(customerId, dto);
  }

  @Delete('/:customerId')
  async deleteCustomer(
    @Param('customerId') customerId: string,
  ): Promise<Customer> {
    return this.customerService.deleteCustomer(customerId);
  }
}
