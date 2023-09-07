import { User } from '@/collections/User';
import { CustomRepository, getRepository } from 'fireorm';
import { AppRepository } from './AppRepository';

@CustomRepository(User)
class UserRepository extends AppRepository<User> {}

export const userRepository = getRepository(User) as UserRepository;
