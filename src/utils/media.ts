export function mediaPublicUrl(uri: string) {
	return `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_BUCKET_NAME}/o/images%2${uri}`;
}
