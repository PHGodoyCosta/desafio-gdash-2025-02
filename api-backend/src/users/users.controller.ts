import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/users.dto';

@Controller('users')
export class UsersController {
    constructor (private readonly userService: UsersService) {}

    @Get("all")
    getAllUsers() {
        return this.userService.findAllUsers()
    }

    @Get(":hash")
    getByHash(@Param("hash") hash: string) {
        return this.userService.findUserByHash(hash)
    }

    @Put()
    createUser(@Body() user: CreateUserDTO) {
        return this.userService.createUser(user)
    }
}
