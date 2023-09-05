import { initDatabase } from '@/services/firebase';
import { BaseFirestoreRepository, IEntity } from 'fireorm';

export class AppRepository<T extends IEntity> extends BaseFirestoreRepository<T> {
	get db() {
		const { db } = initDatabase();
		return db;
	}

	get collectionRef() {
		return this.firestoreColRef;
	}
}
