import vnexpressNet from '@/services/cheerio/news/vnexpress.net';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { page } = await req.json();
	try {
		let result = { page };
		switch (page) {
			case 'vne':
				console.log(page);
				await vnexpressNet.saveNews('https://vnexpress.net/the-thao', 1);
				break;
			default:
				break;
		}
		return NextResponse.json(result);
	} catch (err: any) {
		//console.log(err);
		return NextResponse.json(err, { status: 500 });
	}
}
