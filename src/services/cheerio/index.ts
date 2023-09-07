import { Article } from '@/collections/Article';
import { ArticleCategory } from '@/collections/ArticleCategory';
import { articleCategoryRepository } from '@/repositories/ArticleCategoryRepository';
import { articleRepository } from '@/repositories/ArticleRepository';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface ArticleElement {
	title: string;
	description: string;
	content: string;
	category: string;
}

export class ArticleCrawl {
	async saveArticle(articleUrl: string, element: ArticleElement) {
		const pageHTML = await axios.get(articleUrl);

		const $ = cheerio.load(pageHTML.data);

		const title = $(element.title).text();
		const description = $(element.description).text();
		const category = $(element.category).text();
		const content = $(element.content).html();

		let categoryId = '';
		if (category) {
			const catSlug = category
				.toLowerCase()
				.replace(/ /g, '-')
				.replace(/[^\w-]+/g, '');
			let cat = await articleCategoryRepository.whereEqualTo('slug', catSlug).findOne();
			if (cat) {
				categoryId = cat.id;
			} else {
				cat = new ArticleCategory();
				cat.name = category;
				cat.slug = catSlug;
				const saveCat = await articleCategoryRepository.create(cat);
				categoryId = saveCat.id;
			}
		}

		const slug = title
			.toLowerCase()
			.replace(/ /g, '-')
			.replace(/[^\w-]+/g, '');

		let article = await articleRepository
			.whereEqualTo('slug', slug)
			.whereEqualTo('source', 'vnexpress')
			.findOne();

		if (!article) {
			article = new Article();
			article.source = 'vnexpress';
			article.name = title;
			article.slug = slug;
			article.description = description;
			article.categories = [categoryId];
			article.content = content || '';
			await articleRepository.create(article);
		} else {
			article.content = content || '';
			article.description = description || '';
			await articleRepository.update(article);
		}
	}

	async parseListArticles(
		url: string,
		maxArticles: number,
		elementLink: string,
		elementPaging: string,
		elementArticle: ArticleElement,
	) {
		// initialized with the first webpage to visit
		const paginationURLsToVisit: string[] = [url];
		const visitedURLs: string[] = [];

		const articleURLs = new Set<string>();

		// iterating until the queue is empty
		// or the iteration limit is hit
		while (paginationURLsToVisit.length >= 0 && visitedURLs.length <= maxArticles) {
			// the current webpage to crawl
			const paginationURL = paginationURLsToVisit.pop();

			if (!paginationURL) {
				break;
			}

			// retrieving the HTML content from paginationURL
			const pageHTML = await axios.get(paginationURL);

			// adding the current webpage to the
			// web pages already crawled
			visitedURLs.push(paginationURL);

			// initializing cheerio on the current webpage
			const $ = cheerio.load(pageHTML.data);

			// retrieving the pagination URLs
			if (elementPaging) {
				$(elementPaging).each((index, element) => {
					const paginationURL: string = $(element).attr('href') || '';

					// adding the pagination URL to the queue
					// of web pages to crawl, if it wasn't yet crawled
					if (
						paginationURL &&
						!visitedURLs.includes(paginationURL) &&
						!paginationURLsToVisit.includes(paginationURL)
					) {
						paginationURLsToVisit.push(paginationURL);
					}
				});
			}

			// retrieving the product URLs
			$(elementLink).each((index, element) => {
				const articleURL: string = $(element).attr('href') || '';
				if (articleURL) {
					articleURLs.add(articleURL);
				}
			});
		}

		for await (let articleUrl of articleURLs) {
			await this.saveArticle(articleUrl, elementArticle);
		}
	}
}
