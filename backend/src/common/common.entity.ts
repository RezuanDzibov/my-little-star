import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class CommonEntity extends BaseEntity {
  @CreateDateColumn()
  @ApiProperty({
    description: 'Creation datetime',
    example: '2024-03-12T14:26:29.104Z',
  })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'Last update datetime',
    example: '2024-03-12T14:26:29.104Z',
  })
  @IsDate()
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty({
    description: 'Deletion request datetime',
    example: '2024-03-12T14:26:29.104Z',
  })
  @IsDate()
  deletedAt: Date;
}
