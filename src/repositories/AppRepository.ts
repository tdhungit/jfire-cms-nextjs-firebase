import { initDatabase } from '@/services/firebase';
import { BaseFirestoreRepository, IEntity, IRepository } from 'fireorm';

export class AppRepository<T extends IEntity>
	extends BaseFirestoreRepository<T>
	implements IRepository<T>
{
	get db() {
		const { db } = initDatabase();
		return db;
	}

	get collectionRef() {
		return this.firestoreColRef;
	}

	async count(query: any = null) {
		let snapshot;
		if (query) {
			snapshot = await query.count().get();
		} else {
			snapshot = await this.collectionRef.count().get();
		}
		return snapshot.data().count;
	}
}
