var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var nunjucksRender = require('gulp-nunjucks-render');

/*html*/
var htmlSrc = ['app/*.html'];

gulp.task('nunjucks', function() {
	return gulp.src(htmlSrc)
	.pipe(nunjucksRender({
	    path: ['app/templates/**', 'app/templates']
	}))
	.pipe(gulp.dest('dist'))
});

/*css*/
var sassSrc = ['app/*.scss'];

gulp.task('sass', function() {
	return gulp.src(sassSrc)
		.pipe(sass({ style: 'compressed' }))
		.pipe(gulp.dest('dist/assets/css'));
})

/*js*/
var scriptSrc = [
	'app/marfeel.js',
	'app/models/**/*.js',
	'app/controllers/**/*.js'
];

gulp.task('scripts', function() {
	return gulp.src(scriptSrc)
		.pipe(concat('all.min.js'))
		.pipe(uglify().on('error', function(e){
            console.log(e);
         }))
		.pipe(gulp.dest('dist/assets/js'));
});
// gulp.task('scripts', function() {
// 	return gulp.src(scriptSrc)
// 		.pipe(concat('all.min.js'))
// 		.pipe(gulp.dest('dist/assets/js'));
// });


gulp.task('watch', function() {
	gulp.watch(sassSrc.concat(scriptSrc).concat(htmlSrc), function() {
		gulp.run('default');
	});
})

gulp.task('default', ['nunjucks','sass','scripts']);