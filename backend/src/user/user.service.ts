import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async create(email: string, password: string): Promise<User> {
        const hashed = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            email,
            password: hashed,
        });
        return user.save();
    }

    async getAllUsers() {
        return this.userModel.find().select('-password');
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).select('-password').exec();
    }
}
