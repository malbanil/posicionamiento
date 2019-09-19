const browsersync = require("browser-sync").create()
const gulp = require("gulp")
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const zip = require('gulp-zip')

// BrowserSync
function browserSync(done) {
	browsersync.init({
		notify: false,
		server: {
			baseDir: "./"
		}
	})
	done()
}

// BrowserSync Reload
function browserSyncReload(done) {
	browsersync.reload()
	done()
}

// JS Main
function js_main(){
	return gulp.src([
			'dev-src/js/vendor/jquery-1.12.4.min.js',
			'dev-src/js/vendor/slick.min.js',
			'dev-src/js/vendor/jquery.csv.min.js',
			'dev-src/js/script.js'
		])
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./js'))
}

// SCSS General
function general_styles(){
	return gulp.src('dev-src/scss/main.scss')
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 5 versions']
		}))
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(gulp.dest('./css'))
}

//Create .Zip to Production site
function create_zip(){
	return gulp.src([
			'./**',
			'!./details/**',
			'!./dev-src/**',
			'!./node_modules/**',
			'!gulpfile.js',
			'!package-lock.json',
			'!package.json',
			'!README.md'
		])
		.pipe(zip('File-PROD.zip'))
		.pipe(gulp.dest('./'))
}

// Watch files
function watchFiles() {
	gulp.watch("./dev-src/scss/*", general_styles)
	gulp.watch("./dev-src/js/script.js", js_main)
	gulp.watch("./**/*", browserSyncReload)
}

const build = gulp.series(general_styles, js_main, create_zip)
const watch = gulp.parallel(watchFiles, general_styles, js_main, browserSync)

exports.build = build
exports.watch = watch
exports.styles = general_styles
exports.prodzip = create_zip
exports.scripts = js_main
exports.default = build