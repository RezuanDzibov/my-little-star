import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './interfaces/movies.interface';
import { MovieResponseModel } from './movies.resposnseModels';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of random movies.',
    type: MovieResponseModel,
    isArray: true,
  })
  async getRadnomMovies(): Promise<Movie[]> {
    return await this.moviesService.findAll();
  }
}
