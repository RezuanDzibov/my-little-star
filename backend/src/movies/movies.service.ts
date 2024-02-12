import { Injectable } from '@nestjs/common';
import { Movie } from './interfaces/movies.interface';
import { HttpService } from '@nestjs/axios';
import { globalConfig } from 'src/config';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {
    this.httpService.axiosRef.defaults.baseURL = globalConfig.KINOPOISK_API_URI;
    this.httpService.axiosRef.defaults.headers.common['x-api-key'] =
      globalConfig.KINOPOISK_API_KEY;
  }

  async findAll(): Promise<Movie[]> {
    return await firstValueFrom(
      this.httpService
        .get(
          `movie?page=1&limit=10&selectFields=name&selectFields=shortDescription&selectFields=year&selectFields=poster`,
        )
        .pipe(map((response) => response.data.docs)),
    );
  }
}
