import {ApiProperty} from "@nestjs/swagger";
import {ResponseCreatedUserDto} from "@/users/dto/create-user.dto";
import {IsArray} from "class-validator";
import {ResponsePaginatedDto} from "@/common/dto/paginated.dto";

export class ResponsePaginatedUsersDto extends ResponsePaginatedDto {
    @ApiProperty({
        description: 'List of Users',
        type: [ResponseCreatedUserDto],
    })
    @IsArray()
    users: ResponseCreatedUserDto[];
}