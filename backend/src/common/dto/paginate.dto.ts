import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsNumber, Max, Min} from "class-validator";

export class PaginateDto {
    @ApiProperty({
        description: 'Page number',
        example: 1
    })
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page: number;

    @ApiProperty({
        description: 'Page limit of entities',
        example: 10,
    })
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(20)
    limit: number;
}
