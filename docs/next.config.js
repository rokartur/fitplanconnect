const withNextra = require('nextra')({
	theme: 'nextra-theme-docs',
	themeConfig: './theme.config.tsx',
	reactStrictMode: true,
	distDir: 'dist',
	output: 'export',
})

module.exports = withNextra()
