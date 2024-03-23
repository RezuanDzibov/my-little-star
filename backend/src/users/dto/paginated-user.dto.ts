import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { ResponsePaginatedDto } from '@/common/dto/paginated.dto';
import { ResponseCreatedUserDto } from '@/users/dto/create-user.dto';

export class ResponsePaginatedUsersDto extends ResponsePaginatedDto {
  @ApiProperty({
    description: 'List of Users',
    type: [ResponseCreatedUserDto],
  })
  @IsArray()
  users: ResponseCreatedUserDto[];
}
