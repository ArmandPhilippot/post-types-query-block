/**
 * Gulp configuration
 */

const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const fs = require('fs');

// Load environment variables
const myDotenv = dotenv.config();
dotenvExpand(myDotenv);

/**
 * Load package.json data.
 */
const package = JSON.parse(fs.readFileSync('./package.json'));
const packageVersion = package.version;

if (myDotenv.error) {
	throw myDotenv.error;
}

module.exports = {
	bump: {
		php: {
			src: process.env.WP_BLOCK_PACKAGE_CAPITALIZE.toLowerCase() + '.php',
			dest: './',
		},
		txt: {
			src: 'readme.txt',
			dest: './',
		},
	},
	init: {
		src: [
			'block.json',
			'composer.json',
			'package.json',
			'phpcs.xml',
			'readme.txt',
			'./**/*.php',
			'!vendor/**/*.php',
			'src/index.js',
			'src/style.scss',
			'src/editor.scss',
		],
		dest: './',
		authorName: process.env.WP_BLOCK_AUTHOR_NAME,
		authorEmail: process.env.WP_BLOCK_AUTHOR_EMAIL,
		authorUrl: process.env.WP_BLOCK_AUTHOR_URL,
		contributors: process.env.WP_BLOCK_CONTRIBUTORS,
		copyright: process.env.WP_BLOCK_COPYRIGHT,
		description: process.env.WP_BLOCK_DESCRIPTION,
		file: {
			main: 'your-package-name.php',
		},
		name: process.env.WP_BLOCK_NAME,
		packageName: process.env.WP_BLOCK_PACKAGE_CAPITALIZE,
		prefix: process.env.WP_BLOCK_PREFIX_PASCALCASE,
		repo: process.env.WP_BLOCK_REPO,
		textDomain: process.env.WP_BLOCK_TEXT_DOMAIN,
		vendorName: process.env.WP_BLOCK_VENDOR_NAME,
	},
	notify: {
		onLastOption: true,
	},
	zip: {
		filename:
			process.env.WP_BLOCK_PACKAGE_CAPITALIZE +
			'-' +
			packageVersion +
			'.zip',
		src: [
			'./**/*',
			'!{certs,certs/**/*}',
			'!{gulp,gulp/**/*}',
			'!{node_modules,node_modules/**/*}',
			'!{src,src/**/*}',
			'!{vendor,vendor/**/*}',
			'!./**/*.map',
			'!.commitlintrc.json',
			'!.editorconfig',
			'!.env',
			'!.eslintrc.js',
			'!.eslintignore',
			'!.prettierrc',
			'!.stylelintrc.json',
			'!.versionrc',
			'!babel.config.json',
			'!composer.json',
			'!composer.lock',
			'!gulpfile.js',
			'!package.json',
			'!package-lock.json',
			'!phpcs.xml',
			'!webpack.config.js',
		],
		dest: './',
	},
};
