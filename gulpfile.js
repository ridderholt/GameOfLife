var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	watch = require('gulp-watch');

gulp.task('coffee', function(){
	return gulp.src('./coffee/*.coffee')
				.pipe(coffee({ bare: true }))
				.pipe(gulp.dest('./js'));
});

gulp.task('browserify', ['coffee'], function(){
	return gulp.src('./js/*.js')
				.pipe(browserify({ insertGlobals: false }))
				.pipe(gulp.dest('./js/build'));
});

gulp.task('watch', function(){
	gulp.watch('./coffee/*.coffee', ['coffee', 'browserify']);
});


gulp.task('default', ['coffee', 'browserify']);

