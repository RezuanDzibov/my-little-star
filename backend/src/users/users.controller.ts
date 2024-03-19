import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ResponseCreatedUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';

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
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve User',
    description: 'Endpoint to retrieve User'
  })
  @ApiOkResponse({ type: ResponseCreatedUserDto })
  async findOne(@Param('id', new ParseUUIDPipe({version: '4'})) userId: string) {
    return this.usersService.findOne(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
