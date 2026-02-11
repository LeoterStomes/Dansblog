// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const REPO_BASE = '/DansBlog/';

function rehypePrefixPublicImageBase(basePath) {
	return () => {
		return (tree) => {
			const walk = (node) => {
				if (!node || typeof node !== 'object') return;

				if (
					node.type === 'element' &&
					node.tagName === 'img' &&
					node.properties &&
					typeof node.properties.src === 'string'
				) {
					const src = node.properties.src;
					if (src.startsWith('/image/')) {
						node.properties.src = `${basePath}${src.slice(1)}`;
					}
				}

				if (Array.isArray(node.children)) {
					for (const child of node.children) walk(child);
				}
			};

			walk(tree);
		};
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://dancncn.github.io',
	base: REPO_BASE,
	trailingSlash: 'always',
	output: 'static',
	integrations: [mdx(), sitemap()],
	markdown: {
		rehypePlugins: [rehypePrefixPublicImageBase(REPO_BASE)],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
