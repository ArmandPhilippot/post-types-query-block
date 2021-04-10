/**
 * Gulpfile
 *
 * Use Gulp to build a WordPress block.
 *
 * Implements:
 * - BrowserSync (with watch task)
 * - Pot file generation
 * - Zip folder without development files
 * - Copy `package.json` version to WP files
 * - A one-time task to init your block
 *
 * @author Armand Philippot <contact@armandphilippot.com>
 */

/**
 * Load Gulp configuration and error handler.
 */
const config = require('./gulp/config');

/**
 * Load Gulp plugins.
 */
const { src, dest, parallel } = require('gulp');

/* Utilities */
const del = require('del');
const fs = require('fs');
const notify = require('gulp-notify');
const { pipeline } = require('stream');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const vinylPaths = require('vinyl-paths');
const zip = require('gulp-zip');

/**
 * Load package.json data.
 */
const package = JSON.parse(fs.readFileSync('./package.json'));
const packageVersion = package.version;

/**
 * Task: `zipBlock`
 *
 * Generate a zip version of the plugin without development files.
 */
function zipBlock(done) {
	return pipeline(
		[
			src(config.zip.src),
			zip(config.zip.filename),
			dest(config.zip.dest),
			notify({
				title: 'zipBlock task complete',
				message: 'Block have been zipped.',
			}),
		],
		done()
	);
}

/**
 * Task: `bumpPHP`
 *
 * Copy package.json version in main plugin file.
 */
function bumpPHP(done) {
	return pipeline(
		[
			src(config.bump.php.src),
			replace(/Version:           (.{5})/g, function () {
				return 'Version:           ' + packageVersion;
			}),
			replace(/_VERSION', '(.{5})'/g, function () {
				return "_VERSION', '" + packageVersion + "'";
			}),
			dest(config.bump.php.dest),
		],
		done()
	);
}

/**
 * Task: `bumpTXT`
 *
 * Copy package.json version in readme.txt.
 */
function bumpTXT(done) {
	return pipeline(
		[
			src(config.bump.txt.src),
			replace(/Stable tag: (.{5})/g, function () {
				return 'Stable tag: ' + packageVersion;
			}),
			dest(config.bump.txt.dest),
		],
		done()
	);
}

/**
 * Task: `renameMainFile`
 *
 * Init the block folder by renaming the main PHP file.
 */
function renameMainFile(done) {
	return pipeline(
		[
			src(config.init.file.main, { base: './' }),
			vinylPaths(del),
			rename({
				basename: config.init.packageName.toLowerCase(),
			}),
			dest(config.init.dest),
			notify({
				title: 'renameMainFile task complete',
				message: 'Main PHP file has been renamed.',
				onLast: config.notify.onLastOption,
			}),
		],
		done()
	);
}

/**
 * Task: `replaceBlockInfo`
 *
 * Init the block folder by replacing some placeholders.
 */
function replaceBlockInfo(done) {
	return pipeline(
		[
			src(config.init.src, { base: './' }),
			replace('Firstname Lastname', function () {
				return config.init.authorName;
			}),
			replace('your@email.com', function () {
				return config.init.authorEmail;
			}),
			replace('https://www.yourWebsite.com/', function () {
				return config.init.authorUrl;
			}),
			replace('(WordPress.org usernames)', function () {
				return config.init.contributors;
			}),
			replace('2020 Company Name', function () {
				return config.init.copyright;
			}),
			replace('Your block name', function () {
				return config.init.name;
			}),
			replace('Your block description.', function () {
				return config.init.description;
			}),
			replace('Your-Package-Name', function () {
				return config.init.packageName;
			}),
			replace('Your_Package_Name', function () {
				return config.init.packageName.replace(/-/g, '_');
			}),
			replace('your-package-name', function () {
				return config.init.packageName.toLowerCase();
			}),
			replace('your_package_name', function () {
				return config.init.packageName.toLowerCase().replace(/-/g, '_');
			}),
			replace('YourPrefix', function () {
				return config.init.prefix;
			}),
			replace('yourprefix', function () {
				return config.init.prefix.toLowerCase();
			}),
			replace('YOURPREFIX', function () {
				return config.init.prefix.toUpperCase();
			}),
			replace('https://github.com/your/repo', function () {
				return config.init.repo;
			}),
			replace('yourTextDomain', function () {
				return config.init.textDomain;
			}),
			replace('your-vendor-name', function () {
				return config.init.vendorName;
			}),
			dest(config.init.dest),
			notify({
				title: 'replaceBlockInfo task complete',
				message:
					'The placeholders have been replaced by your dotenv data.',
				onLast: config.notify.onLastOption,
			}),
		],
		done()
	);
}

/**
 * Public tasks
 */
exports.bump = parallel(bumpPHP, bumpTXT);
exports.initBlock = replaceBlockInfo;
exports.renameFiles = renameMainFile;
exports.zipBlock = zipBlock;
