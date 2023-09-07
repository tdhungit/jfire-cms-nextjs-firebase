import { Media, storageBucket } from '@/collections/Media';
import { mediaRepository } from '@/repositories/MediaRepository';
import { getSessionUser } from '@/utils/user';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
	const session: any = await getSessionUser();
	if (!session) {
		return NextResponse.json({ message: 'unauthenticated' }, { status: 403 });
	}

	const medias = await mediaRepository.find();
	return NextResponse.json(medias);
}

export async function POST(req: NextRequest) {
	const session: any = await getSessionUser();
	if (!session) {
		return NextResponse.json({ message: 'unauthenticated' }, { status: 403 });
	}

	const data = await req.formData();
	let res = [];
	for await (const [key, value] of Array.from(data.entries())) {
		const isFile = typeof value === 'object';
		if (isFile) {
			const blob = value as Blob;
			const fileName = blob.name;
			// check exist
			const exist = await mediaRepository.whereEqualTo('name', fileName).find();
			if (exist && exist[0] && exist[0].id) {
				res.push(exist[0]);
			} else {
				try {
					// create token
					const token = uuidv4();
					// convert to stream
					const buffer = Buffer.from(await blob.arrayBuffer());
					// upload
					const file = storageBucket.file(fileName);
					await file.save(buffer, {
						metadata: {
							metadata: {
								firebaseStorageDownloadTokens: token,
							},
							contentType: blob.type,
							public: true,
						},
					});

					// save to db
					let media = new Media();
					media.name = fileName;
					media.type = blob.type;
					media.token = token;
					const bucketUrl = process.env.FIREBASE_BUCKET_NAME?.replace('gs://', '');
					media.url = `https://firebasestorage.googleapis.com/v0/b/${bucketUrl}/o/${encodeURIComponent(
						fileName,
					)}?alt=media&token=${token}`;

					const info = await mediaRepository.create(media);

					// file
					// 	.getSignedUrl({ action: 'read', expires: dayjs().add(1, 'year').format('YYYY-MM-DD') })
					// 	.then((url) => {
					// 		// save to db
					// 		let media = new Media();
					// 		media.name = fileName;
					// 		media.type = blob.type;
					// 		media.token = token;
					// 		media.url = url.toString();
					// 		mediaRepository.create(media).then((m) => {});
					// 	});

					//res.push({ name: fileName, type: blob.type });
					res.push(info);
				} catch (err: any) {
					console.log(err);
				}
			}
		}
	}

	return NextResponse.json(res);
}
