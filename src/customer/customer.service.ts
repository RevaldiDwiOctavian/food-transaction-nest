import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Customer } from 'prisma/prisma-client';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCustomers(): Promise<Customer[]> {
    return this.prismaService.customer.findMany();
  }

  async getCustomer(customerId: string): Promise<Customer> {
    return this.prismaService.customer.findUnique({
      where: { customer_id: parseInt(customerId) },
    });
  }

  async createCustomer(dto: CreateCustomerDto): Promise<Customer> {
    return this.prismaService.customer.create({
      data: {
        first_name: dto.firstName,
        last_name: dto.lastName,
        email: dto.email,
        phone_number: dto.phoneNumber,
        address: dto.address,
      },
    });
  }

  async updateCustomer(
    customerId: string,
    dto: CreateCustomerDto,
  ): Promise<Customer> {
    const currentCustomerEmail = await this.prismaService.customer
      .findUnique({
        where: { customer_id: parseInt(customerId) },
      })
      .then((customer) => {
        return customer.email;
      });

    if (currentCustomerEmail !== dto.email) {
      const existedEmail = await this.prismaService.customer.findUnique({
        where: { email: dto.email },
      });

      if (existedEmail) {
        console.error('Email already exists');
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }

    return this.prismaService.customer.update({
      data: {
        first_name: dto.firstName,
        last_name: dto.lastName,
        email: dto.email,
        phone_number: dto.phoneNumber,
        address: dto.address,
      },
      where: { customer_id: parseInt(customerId) },
    });
  }

  async deleteCustomer(customerId: string): Promise<Customer> {
    return this.prismaService.customer.delete({
      where: { customer_id: parseInt(customerId) },
    });
  }
}
