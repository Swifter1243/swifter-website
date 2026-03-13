import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'dist',
			assets: 'dist',
			fallback: '404.html'
		})
	},
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) => ({ runes: !filename.includes('node_modules') })
	}
};

export default config;
