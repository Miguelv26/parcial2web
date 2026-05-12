import { Injectable } from '@nestjs/common';
import { EngagementQueryDto } from './dto/engagement-query.dto';
import { CpmQueryDto } from './dto/cpm-query.dto';

@Injectable()
export class MetricsService {
  engagement(dto: EngagementQueryDto) {
    const rate = ((dto.likes + dto.comments) / dto.followers) * 100;

    return {
      rate,
    };
  }

  cpm(dto: CpmQueryDto) {
    const cpm = (dto.cost / dto.impressions) * 1000;

    return {
      cpm,
    };
  }
}
