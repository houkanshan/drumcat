var gulp = require('gulp')
var gutil = require('gulp-util')
var tinylr = require('tiny-lr')
var lr = tinylr()
var livereload = require('gulp-livereload')

var stylus = require('gulp-stylus')
gulp.task('css', function () {
  gulp.src(['src/css/index.styl', 'src/css/mobile.styl'])
    .pipe(stylus({ set: ['compress'] })
      .on('error', gutil.log))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(livereload(lr))
})

var jade = require('gulp-jade')
var myIp = require('my-ip')
var config = { locals: { ip: myIp() } }
gulp.task('html', function() {
  gulp.src('src/template/*.jade')
    .pipe(jade(config).on('error', gutil.log))
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload(lr))
})

var browserify = require('gulp-browserify')
gulp.task('js', function() {
  gulp.src('src/js/main.js')
    .pipe(browserify({
        insertGlobals : true
      , debug : false
      , ready: false
      , builtins: false
      , shim: {
          jquery: {
            path: 'src/js/lib/jquery.js'
          , exports: 'jQuery'
          }
        , underscore: {
            path: 'src/js/lib/underscore.js'
          , exports: '_'
          }
        , backbone: {
            path: 'src/js/lib/backbone.js'
          , exports: 'Backbone'
          , depends: { underscore: 'underscore' }
          }
        , arktouch: {
            path: 'src/js/lib/arktouch.js'
          , exports: 'globalTouch'
          }
        , howler: {
            path: 'src/js/lib/howler.js'
          , exports: 'Howl'
          }
        , app: {
            path: 'src/js/app.js'
          , exports: 'app'
          }
        }
      }, { require: true })
      .on('error', gutil.log))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(livereload(lr))
})

gulp.task('copy', function() {
  gulp.src('src/pic/**/*').pipe(gulp.dest('dist/pic/'))
  gulp.src('src/media/**/*').pipe(gulp.dest('dist/media/'))
})

var serve = require('gulp-serve')
gulp.task('static', serve({
  root: 'dist'
, port: '8081'
}))

gulp.task('watch', function () {
  lr.listen(35729, function (err) {
    if (err) return console.info(err);
    gulp.watch('./src/css/**/*.styl', ['css'])
    gulp.watch('./src/template/**/*.jade', ['html'])
    gulp.watch('./src/js/**/*.js', ['js'])
  })
})

gulp.task('default', ['css', 'html', 'js', 'copy'])
gulp.task('server', ['default', 'watch', 'static'])
