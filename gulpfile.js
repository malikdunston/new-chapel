'use strict';

var browserSync = require("browser-sync").create();
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var changed = require('gulp-changed');

var projFiles = [
	"./**",
	"./**/**/**/*.html",
	"./**/**/**/*.scss",
	"./**/**/**/*.js",
	"./**/**/**/*.svg"
]

var SCSS_WATCH = './src/assets/scss/**/*.scss';
var SCSS_SRC = './src/assets/scss/index.scss';
var SCSS_DEST = './src/assets/css';

function compile_scss() {
	return gulp.src(SCSS_SRC)
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(changed(SCSS_SRC))
		.pipe(gulp.dest(SCSS_DEST));
};
function watch_scss(cb) {
	gulp.watch(SCSS_WATCH, compile_scss);
	cb();
};

function serve(cb){
	// browserSync.init();
	gulp.watch(projFiles).on("change", browserSync.reload)
	cb();
}

gulp.task('default', gulp.parallel(serve, watch_scss));

exports.serve = serve;
exports.compile_scss = compile_scss;
exports.watch_scss = watch_scss;