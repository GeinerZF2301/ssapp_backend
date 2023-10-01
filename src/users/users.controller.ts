
import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(){
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number){
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Body() user:RegisterAuthDto) {
    return this.userService.createUser(user);
  }

  @Delete(':id')
  deleteUser(@Param('id',ParseIntPipe) id:number){
   return this.userService.deleteUser(id)
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto){
    return this.userService.updateUser( id, user);
  }


}
