import { User } from 'src/typeorm/entities/user.entity';
import { createUserDto } from 'src/users/dto/create-user.dto';

export abstract class UserRepository {
  abstract create(data: createUserDto): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: number): Promise<User | null>;
}
