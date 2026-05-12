import { Controller, Get, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { EngagementQueryDto } from './dto/engagement-query.dto';
import { CpmQueryDto } from './dto/cpm-query.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('engagement')
  engagement(@Query() dto: EngagementQueryDto) {
    return this.metricsService.engagement(dto);
  }

  @Get('cpm')
  cpm(@Query() dto: CpmQueryDto) {
    return this.metricsService.cpm(dto);
  }
}
