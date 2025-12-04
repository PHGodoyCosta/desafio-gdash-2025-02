import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './repositories/users.schema';
import { Model } from 'mongoose';
import { v4 } from 'uuid'
import { CreateUserDTO } from './dto/users.dto';
import { hashSync as bcryptHash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor (
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) {}

    async createUser(data: CreateUserDTO) {
         if (!await this.isRegistered(data.email)) {
            const newUser = new this.userModel({
                hash: v4(),
                name: data.name,
                email: data.email,
                type: "user",
                password: bcryptHash(data.password, 10)
            })

            return newUser.save()
        } else {
            throw new HttpException("Usuário já registrado!", 401)
        }
    }

    async findAllUsers() {
        try {
            return this.userModel.find().exec()
        } catch {
            throw new HttpException("Erro ao buscar usuários", 500)
        }
    }

    async findUserByHash(hash: string) {
        const user = await this.userModel.findOne({ hash }).exec()

        if (!user) {
            throw new HttpException("Usuário não encontrado", 404)
        }

        return {
            hash: user.hash,
            username: user.name,
            email: user.email,
            type: user.type
        }
    }

    async findUserByEmail(email: string) {
        const user = await this.userModel.findOne({ email }).exec()

        if (!user) {
            throw new HttpException("Usuário não encontrado", 404)
        }

        return user
    }

    async delete(hash: string) {
        const result = await this.userModel.deleteOne({ hash }).exec()
        
        if (result.deletedCount === 0) {
            throw new HttpException("Usuário não encontrado", 404);
        }

        return {
            message: "Usuário deletado com sucesso"
        };
    }

    async rename(hash: string, name: string) {
        try {
            await this.userModel.updateOne(
                { hash: hash },
                { $set: { name: name } }
            )

            return {
                name: name,
                hash: hash
            }
        } catch {
            throw new HttpException("Não consegui renomear o usuário", 500)
        }
    }

    async updateEmail(hash: string, email: string) {
        try {
            await this.userModel.updateOne(
                { hash: hash },
                { $set: { email: email } }
            )

            return {
                email: email,
                hash: hash
            }
        } catch {
            throw new HttpException("Não consegui fazer o update no Email", 500)
        }
    }

    async updatePassword(hash: string, password: string) {
        try {
            await this.userModel.updateOne(
                { hash: hash },
                { $set: { password: bcryptHash(password, 10) } }
            )

            return {
                status: "ok",
                hash: hash
            }
        } catch {
            throw new HttpException("Não consegui fazer o update da Senha", 500)
        }
    }

    async updateUser(req: any, hash: string, name: string = "", email: string = "", password: string = "") {
        //console.log(`${name} | ${email} | ${password}`)
        if (name) {
            await this.rename(hash, name)
        }

        if (email) {
            if (!await this.isRegistered(email) && req.user.email != email) {
                await this.updateEmail(hash, email)
            } else {
                throw new HttpException("Esse email já está registrado!", 401)
            }
        }

        if (password) {
            await this.updatePassword(hash, password)
        }

        return {"status": "OK"}
    }

    async isRegistered(email: string) {
        const user = await this.userModel.findOne({ email }).exec()

        if (!user) {
            return false
        }

        return true
    }
}
