import { initDatabase } from '@/services/firebase';
import { createDocsResponse } from '@/utils/firestore';
import { BaseFirestoreRepository, IEntity, IRepository } from 'fireorm';

interface OrderByQuery {
	field: string;
	direction?: any;
}

interface FilterQuery {
	field: string;
	operator: string;
	value?: string;
}

interface PaginationQuery {
	page?: number;
	limit?: number;
	orderBy?: OrderByQuery[];
	filter?: FilterQuery[];
}

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

	async pagination({ page, limit, orderBy, filter }: PaginationQuery) {
		page = page || 1;
		if (page <= 0) page = 1;
		limit = limit || 20;

		const query = this.collectionRef;
		// filter
		if (filter && filter.length > 0) {
			filter.map((item: any) => {
				query.where(item.field, item.operator, item.value);
			});
		}
		// get total
		const snapshotCount = await query.count().get();
		const total = snapshotCount.data().count;
		// order by
		if (orderBy && orderBy.length > 0) {
			orderBy.map((item) => {
				query.orderBy(item.field, item.direction || 'asc');
			});
		}
		// offset
		const offset = (page - 1) * limit;
		// get snapshot
		const snapshot = await query.offset(offset).limit(limit).get();
		// create response
		return {
			docs: createDocsResponse(snapshot),
			total,
			page,
		};
	}
}
