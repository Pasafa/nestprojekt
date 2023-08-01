import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  @Get('/:id') //it alsways loks at the string string needs to be parsed as a number
  async findUser(@Param('id') id: string) { //paerse handles this
    const user =  await this.usersService.findOneBy(parseInt(id))
    if (!user) {
      throw new NotFoundException('user not found')
    }
    return user;

  }

  @Get() 
  findAllUsers(@Query('email') email: string) { 
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id') 
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

}
