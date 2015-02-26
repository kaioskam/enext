var gulp = require('gulp');
var gutil = require('gutil');
var coffee = require('gulp-coffee');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('sass', function() {
  gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/scss'));
});

gulp.task('coffee', function() {
  gulp.src('./src/coffeescript/*.coffee')
    .pipe(coffee({
      bare: true
    }).on('error', gutil.log))
    .pipe(gulp.dest('./build/coffee'))
});

gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('./src/jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./build/jade'))
});

gulp.task('img', function() {
  return gulp.src('./src/img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./build/img'));
});

gulp.task('default', ['sass', 'coffee', 'templates', 'img'], function() {
  console.log('done');
});