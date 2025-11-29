import { Controller, Get, Param, Patch, Body, Delete, UseGuards, Request, HttpException, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/users.dto';
import { AuthGuard } from '../auth/auth.guard';

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

    @Post()
    createUser(@Body() user: CreateUserDTO) {
        return this.userService.createUser(user)
    }

    @UseGuards(AuthGuard)
    @Patch(":hash/rename")
    rename(
        @Body("name") name: string,
        @Param("hash") hash: string,
        @Request() req
    ) {
        console.log(req.user.sub)
        console.log(req.user.type)

        if (!req.user.sub || !name || hash != req.user.sub) {
            throw new HttpException("Dados inválidos!", 401)
        }

        return this.userService.rename(hash, name)
    }

    @UseGuards(AuthGuard)
    @Delete(":hash/delete")
    delete(
        @Param("hash") hash: string,
        @Request() req
    ) {
        console.log(req.user.sub)
        console.log(req.user.type)

        if (hash != req.user.sub && req.user.type != "admin") {
            throw new HttpException("Você não pode deletar outra conta!", 403)
        }

        return this.userService.delete(hash)
    }
}
