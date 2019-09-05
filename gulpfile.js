const browsersync = require("browser-sync").create();
const gulp = require("gulp");
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

// BrowserSync
function browserSync(done) {
	browsersync.init({
		notify: false,
		server: {
			baseDir: "./"
		}
	});
	done();
}

// BrowserSync Reload
function browserSyncReload(done) {
	browsersync.reload();
	done();
}

// JS Main
function js_main(){
	return gulp.src([
			'dev-src/js/vendor/jquery-1.12.4.min.js',
			'dev-src/js/vendor/slick.min.js',
			'dev-src/js/script.js'
		])
		.pipe(concat('script.js'))
		.pipe(gulp.dest('./js'))
}

// SCSS General
function general_styles(){
	return gulp.src('dev-src/scss/main.scss')
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 5 versions']
		}))
		.pipe(sass())
		.pipe(gulp.dest('./css'))
}

// Watch files
function watchFiles() {
	gulp.watch("./dev-src/scss/*", general_styles);
	gulp.watch("./dev-src/js/script.js", js_main);
	gulp.watch("./**/*", browserSyncReload);
}

const build = gulp.series(watchFiles, general_styles, browserSync);
const watch = gulp.parallel(watchFiles, general_styles, js_main, browserSync);

exports.build = build;
exports.watch = watch;
exports.styles = general_styles
exports.scripts = js_main
exports.default = build;