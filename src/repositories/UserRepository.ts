import { User } from '@/collections/User';
import { CustomRepository } from 'fireorm';
import { AppRepository } from './AppRepository';

@CustomRepository(User)
export class UserRepository extends AppRepository<User> {}
