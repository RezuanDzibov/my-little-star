import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class ResponsePaginatedDto {
  @ApiProperty({
    description: 'Count of returned entities',
    example: 1,
  })
  @IsNumber()
  @Min(0)
  count: number;

  @ApiProperty({
    description: 'Page number',
    example: 1,
  })
  @IsNumber()
  @Min(1)
  page: number;
}
