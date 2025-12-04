import { Controller, Get, Param, Patch, Body, Delete, UseGuards, Request, HttpException, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdaterUserDTO } from './dto/users.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor (private readonly userService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get("all")
    getAllUsers(@Request() req) {
        if (req.user.type != "admin") {
            throw new HttpException("Você só pode ver suas informações!", 401)
        }

        return this.userService.findAllUsers()
    }
    
    @UseGuards(AuthGuard)
    @Get("me")
    getMyAccount(@Request() req) {
        return {
            hash: req.user.sub,
            username: req.user.username,
            email: req.user.email,
            type: req.user.type
        }
    }

    @UseGuards(AuthGuard)
    @Get(":hash")
    getByHash(
        @Param("hash") hash: string,
        @Request() req
    ) {
        if (hash != req.user.sub && req.user.type != "admin") {
            throw new HttpException("Você só pode ver suas informações!", 401)
        }

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

        if (!req.user.sub || !name || hash != req.user.sub) {
            throw new HttpException("Dados inválidos!", 401)
        }

        return this.userService.rename(hash, name)
    }

    @UseGuards(AuthGuard)
    @Patch(":hash/update")
    update(
        @Body() data: UpdaterUserDTO,
        @Param("hash") hash: string,
        @Request() req
    ) {
        if (req.user.sub != hash) {
            throw new HttpException("Você só pode ver fazer update de dados da sua conta!", 401)
        }

        return this.userService.updateUser(req, hash, data.name, data.email, data.password)
    }

    @UseGuards(AuthGuard)
    @Delete(":hash/delete")
    delete(
        @Param("hash") hash: string,
        @Request() req,
        @Res({ passthrough: true }) res
    ) {

        if (hash != req.user.sub && req.user.type != "admin") {
            throw new HttpException("Você não pode deletar outra conta!", 403)
        }

        if (hash == req.user.sub) {
            res.clearCookie("access_token");
        }

        return this.userService.delete(hash)
    }
}
