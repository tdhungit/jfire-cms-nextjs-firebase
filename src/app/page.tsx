import { pageRepository } from '@/collections/Page';

async function getPage() {
	return await pageRepository.whereEqualTo('isDefault', true).findOne();
}

export default async function Home() {
	const page = await getPage();
	return (
		<div className="overflow-hidden" dangerouslySetInnerHTML={{ __html: page?.content || '' }} />
	);
}
