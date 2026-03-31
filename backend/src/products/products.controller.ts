import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { Role } from '../common/roles';
import { UpsertProductDto } from './product.dto';

const products: Array<Record<string, unknown>> = [];

@UseGuards(RolesGuard)
@Controller('products')
export class ProductsController {
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  @Get()
  getAllProducts() {
    return products;
  }

  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  @Post()
  addProduct(@Body() product: UpsertProductDto) {
    const created = { id: crypto.randomUUID(), ...product };
    products.push(created);
    return created;
  }

  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: UpsertProductDto) {
    const index = products.findIndex((candidate) => candidate.id === id);
    if (index === -1) {
      return { message: 'Product not found' };
    }

    products[index] = { ...products[index], ...product };
    return products[index];
  }
}
