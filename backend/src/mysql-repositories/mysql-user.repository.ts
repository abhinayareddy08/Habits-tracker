import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/typeorm/entities/user.entity';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MysqlUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(data: createUserDto): Promise<User> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return (await this.repository.findOne({ where: { email } })) ?? null;
  }
  async findById(id: number): Promise<User | null> {
    return (await this.repository.findOne({ where: { id } })) ?? null;
  }
}
