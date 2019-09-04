const browsersync = require("browser-sync").create();
const gulp = require("gulp");
const sass = require('gulp-sass');
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

// SCSS General
function general_styles(){
	return gulp.src('scss/main.scss')
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 5 versions']
		}))
		.pipe(sass())
		.pipe(gulp.dest('css'))
}

// Watch files
function watchFiles() {
	gulp.watch("./scss/*", general_styles);
	gulp.watch("./**/*", browserSyncReload);
}

const build = gulp.series(watchFiles, general_styles, browserSync);
const watch = gulp.parallel(watchFiles, general_styles, browserSync);

exports.build = build;
exports.watch = watch;
exports.styles = general_styles
exports.default = build;