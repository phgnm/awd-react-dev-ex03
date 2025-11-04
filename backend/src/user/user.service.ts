import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async register(
        email: string,
        password: string
    ) {
        const existing = await this.userModel.findOne({ email });
        if (existing)
            throw new ConflictException('Email already exists');

        const hashed = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            email,
            password: hashed
        });
        return user.save(); 
    }

    async getAllUsers() {
        return this.userModel.find().select('-password');
    }
}
