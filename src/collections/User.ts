import { initDatabase } from '@/services/firebase';
import { Collection, getRepository } from 'fireorm';

initDatabase();

@Collection()
export class User {
  id: string = '';
  createdAt: Date = new Date();
  status: string = 'Active';
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  roles: Array<string> = ['USER'];
}

export const userRepository = getRepository(User);
