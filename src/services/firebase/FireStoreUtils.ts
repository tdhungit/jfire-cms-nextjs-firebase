import { initDatabase } from '.';

class FireStoreUtils {
	collectionRef(collectionName: string) {
		const { db } = initDatabase();
		return db.collection(collectionName);
	}

	async count(collectionName: string) {
		const ref = this.collectionRef(collectionName);
		const snapshot = await ref.count().get();
		return snapshot.data().count;
	}
}

export default new FireStoreUtils();
