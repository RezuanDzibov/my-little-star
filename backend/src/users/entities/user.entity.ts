import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

import { CommonEntity } from '@/common/common.entity';

@Entity()
export class User extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique Id of User',
    example: '134d892e-dfba-44ff-a92a-78ae70a26c9d',
  })
  @IsUUID('4')
  id: string;

  @Column({ unique: true })
  @Index()
  @ApiProperty({
    description: 'Unique username of User',
    example: 'rezuan_dzibov',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  username: string;

  @Column({ unique: true })
  @Index()
  @ApiProperty({
    description: 'Unique email of User',
    example: 'rezuan_dzibov@gmailc.com',
  })
  @IsEmail()
  @MinLength(6)
  @MaxLength(64)
  email: string;

  @Column()
  @ApiProperty({
    description: 'Strong password for User',
    example: 'ver7_Stron5Password',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 4,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  @MinLength(8)
  @MaxLength(256)
  password: string;
}
