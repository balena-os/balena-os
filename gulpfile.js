'use strict';

var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var through = require('through2');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');gutil
var del = require('del');
var babel = require('babelify');

// Import our configured Metalsmith instance
var Doxx = require('@resin.io/doxx')
var doxxConfig = require('./config/doxx')
var destDir = './' + doxxConfig.destDir

// Set the browserSync defaults and start the watch process.
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: destDir,
      reloadOnRestart: true
    }
  });
  gulp.watch(['./templates/**', './config/**', './shared/**'], gulp.series('build', 'reload'));
  gulp.watch('./static/styles/**', gulp.series('css', 'reload'));
  gulp.watch('./static/js/**', gulp.series('js', 'reload'));
});

// cleans build destination folder
gulp.task('clean', function (cb) {
  return del([ destDir + '/**'], {dot: true}, cb)
});

// Process Sass
gulp.task('css', function() {
  return gulp.src('./static/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifycss())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest(destDir + '/static/styles/'));
});


// Bundle js with browserify.
gulp.task('js', function () {
 // set up the browserify instance on a task basis
  var b = browserify({
    entries: './static/js/main.js',
    debug: true
  })

return b.bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
     // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .on('error', gutil.log)
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(destDir + '/static/js/'));
});

// runs custom metalsmith build
gulp.task('doxx', function(done) {
  var doxxConfig = require('./config/doxx')
  var doxx = Doxx(doxxConfig)
  doxx.build(function(err) {
    if(err) throw err;
    done()
  })
});

// reloads browser
gulp.task('reload', function (done) {
  browserSync.reload();
  done()
})

// builds all static assets
gulp.task('build', gulp.series('clean', 'doxx', 'js', 'css', 'reload'), function(done) {
  done()
})

// builds and serves static
gulp.task('default', gulp.series('build', 'browser-sync'))
