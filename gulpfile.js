/* MODULES */
var gulp 		= require('gulp');
var minifyCss 	= require('gulp-minify-css');
var sass 		= require('gulp-sass');
var minifyJs 	= require('gulp-jsmin');
var notify 		= require('gulp-notify');
var rename 		= require('gulp-rename');
var browserSync = require('browser-sync');
var reload 		= browserSync.reload;

/* PATHS */
var paths = {
	html: ['index.html'],
	css: ['style.scss'],
	js: ['script.js']
};

/* BROWSERSYNC */
gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: "./"
		},
		port: 8080,
		open: true,
		notify: false
	});
});

/* TASKS */

/*html*/
gulp.task('html', function(){
	gulp.src(paths.html)
		.pipe(reload({stream:true}));
});

/*css*/
gulp.task('mincss', function() {
	return gulp.src(paths.css)
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths: ['node_modules/susy/sass']
			}).on('error', sass.logError))
		.pipe(minifyCss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('css'))
		.pipe(notify('CSS file was updated succesfully!'))
		.pipe(reload({stream:true}));
});

/*js*/
gulp.task('minjs', function() {
	return gulp.src(paths.js)
		.pipe(minifyJs())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('js'))
		.pipe(notify('JS file was updated succesfully!'))
		.pipe(reload({stream:true}));
});

/* WATCHERS */
gulp.task('watcher', function() {
	gulp.watch(paths.html, ['html']);
	gulp.watch(paths.css, ['mincss']);
	gulp.watch(paths.js, ['minjs']);
});

gulp.task('default', ['watcher', 'browserSync']);