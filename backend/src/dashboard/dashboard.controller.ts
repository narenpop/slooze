import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from '../common/roles';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';

@UseGuards(RolesGuard)
@Controller('dashboard')
export class DashboardController {
  @Roles(Role.MANAGER)
  @Get()
  getDashboardInsights() {
    return {
      totalCommodities: 128,
      lowStockItems: 17,
      monthlyRevenue: 37500,
      topPerformingCommodity: 'Rice',
    };
  }
}
