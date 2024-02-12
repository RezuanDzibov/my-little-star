import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class PosterResponseModel {
  @ApiPropertyOptional()
  url?: string;

  @ApiPropertyOptional()
  previewUrl?: string;
}

export class MovieResponseModel {
  @ApiProperty()
  name: string;

  @ApiProperty()
  shortDescription: string;

  @ApiProperty()
  year: number;

  @ApiPropertyOptional({ type: PosterResponseModel })
  poster?: PosterResponseModel;
}
