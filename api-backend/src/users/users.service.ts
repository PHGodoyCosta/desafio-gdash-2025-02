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

        return user
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
                { name: name }
            )

            return {
                name: name,
                hash: hash
            }
        } catch {
            throw new HttpException("Não consegui renomear o usuário", 500)
        }
    }

    async isRegistered(email: string) {
        const user = await this.userModel.findOne({ email }).exec()

        if (!user) {
            return false
        }

        return true
    }
}
