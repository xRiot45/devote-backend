import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardSummaryDto } from './dto/dashboard.dto';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('/summary')
    async getDashboardSummary(): Promise<ApiResponse<DashboardSummaryDto>> {
        return this.dashboardService.getSummary();
    }
}
