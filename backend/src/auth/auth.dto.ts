import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

import { User } from '@/users/entities/user.entity';

export class SignInDto extends PickType(User, ['password']) {
  @ApiProperty({
    description: `User's login`,
    example: 'rezuan_dzibov',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  login: string;
}

export class PayloadDto extends PickType(User, ['username']) {
  @ApiProperty({
    description: 'User Id',
    example: '12d214e6-0751-432f-a405-9d5c7ee4004c',
  })
  @IsString()
  userId: string;
}

export class SignInResponseDto {
  @ApiProperty({
    description: 'Access Token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOWNmMDlkMS0wZjE5LTQ4MTctYWNjNi05NzUxZTI4N2NlZjUiLCJpYXQiOjE3MDQ3ODU2MDgsImV4cCI6MTcwNDg3MjAwOH0._hJSuleUhq5YKKbA6seM5fTkGm437GOYST1dGXx-Okk',
  })
  @IsString()
  accessToken: string;
}
