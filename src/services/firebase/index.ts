import config from '@/config';
import creds from '@/config/firestore.creds.json';
import { Bucket } from '@google-cloud/storage';
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

export const firebaseConfig = {
	bucketName: config.bucketName,
};

export function initDatabase(): {
	storage: admin.storage.Storage;
	instance: admin.app.App;
	bucket: Bucket;
} {
	if (admin.apps.length > 0) {
		return {
			storage: admin.storage(),
			bucket: admin.storage().bucket(firebaseConfig.bucketName),
			instance: admin.app(),
		};
	}

	const serviceAccount: any = creds;

	const instance = admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
		storageBucket: firebaseConfig.bucketName,
	});

	const firestore = admin.firestore();
	fireorm.initialize(firestore);

	return {
		storage: admin.storage(),
		bucket: admin.storage().bucket(firebaseConfig.bucketName),
		instance: instance,
	};
}
