import { User } from '@/collections/User';
import { AppRepository } from './AppRepository';

class UserRepository extends AppRepository<User> {}

export const userRepository = new UserRepository(User);
