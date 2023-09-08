import { articleRepository } from '@/repositories/ArticleRepository';

async function getBlogs(params: any) {
	return await articleRepository.pagination({});
}

export default async function Page() {
	const blogs = await getBlogs({});

	return (
		<div className="container">
			<div className="w-full p-8">
				{blogs.docs.map((blog: any) => (
					<div key={blog.id} className="w-full p-4 m-4">
						<h3>
							<a href={`/blogs/${blog.slug}`}>{blog.name}</a>
						</h3>
						<div className="w-full">{blog.description}</div>
					</div>
				))}
			</div>
		</div>
	);
}
