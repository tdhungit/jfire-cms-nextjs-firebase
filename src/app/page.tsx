import { pageRepository } from '@/collections/Page';

async function getPage() {
	return await pageRepository.whereEqualTo('isDefault', true).findOne();
}

export default async function Home() {
	const page = await getPage();
	return (
		<main
			className="min-h-screen p-0 m-0"
			dangerouslySetInnerHTML={{ __html: page?.content || '' }}
		></main>
	);
}
