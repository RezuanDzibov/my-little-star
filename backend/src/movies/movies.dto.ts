class RatingDto {
  readonly kp: number;
  readonly imdb: number;
}

class PosterDto {
  readonly url: string;
  readonly previewUrl: string;
}

class GenreDto {
  readonly name: string;
}

class CountrieDto {
  readonly name: string;
}

export class MovieRetrieveDto {
  readonly rating: RatingDto;
  readonly name: string;
  readonly movieLength: number;
  readonly description: string;
  readonly year: number;
  readonly poster: PosterDto;
  readonly genres: GenreDto[];
  readonly countries: CountrieDto[];
  readonly type: string;
  readonly shortDescription: string;
  readonly ratingMpaa: string;
}
