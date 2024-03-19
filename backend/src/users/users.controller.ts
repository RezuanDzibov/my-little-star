import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, ParseUUIDPipe, Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ResponseCreatedUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginateDto} from "@/common/dto/paginate.dto";
import {ResponsePaginatedUsersDto} from "@/users/dto/paginated-user.dto";
import {MessageDto} from "@/common/dto/message.dto";

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new User',
    description: 'Endpoint creates new User',
  })
  @ApiCreatedResponse({ type: ResponseCreatedUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get list of Users',
    description: 'Endpoint to get list of users',
  })
  @ApiOkResponse({ type: ResponsePaginatedUsersDto })
  async findAll(@Query() paginateUserDto: PaginateDto) {
    return this.usersService.findAll(paginateUserDto)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve User',
    description: 'Endpoint to retrieve User',
  })
  @ApiOkResponse({ type: ResponseCreatedUserDto })
  async findOne(@Param('id', new ParseUUIDPipe({version: '4'})) userId: string) {
    return this.usersService.findOne(userId);
  }

  @Patch(':id')
  @ApiOperation({
      summary: 'Update User',
      description: 'Endpoint to update User',
  })
  @ApiOkResponse({
      description: 'User successfully updated',
      type: MessageDto,
  })
  async update(@Param('id', new ParseUUIDPipe({version: '4'})) userId: string, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(userId, updateUserDto);

    return { message: 'User successfully updated' }
  }

  @Delete(':id')
  @ApiOperation({
      summary: 'Delete User',
      description: 'Delete User',
  })
  @ApiNoContentResponse({
      description: 'User successfully deleted',
      type: MessageDto,
  })
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) userId: string) {
    await this.usersService.remove(userId);

    return { message: 'User successfully deleted' }
  }
}
