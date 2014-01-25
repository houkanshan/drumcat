var gulp = require('gulp')
var gutil = require('gulp-util')

var stylus = require('gulp-stylus')
gulp.task('css', function () {
  gulp.src('src/css/index.styl')
    .pipe(stylus({
      set:['compress']
    }))
    .pipe(gulp.dest('./dist/css/'))
})

var jade = require('gulp-jade')
gulp.task('html', function() {
  gulp.src('src/template/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/'))
})

var browserify = require('gulp-browserify')
gulp.task('js', function() {
  gulp.src('src/js/main.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !gutil.env.production
    }))
    .pipe(gulp.dest('./dist/js/'))
})

var serve = require('gulp-serve')
gulp.task('server', serve('dist'))

gulp.task('default', ['css', 'html', 'js'])
