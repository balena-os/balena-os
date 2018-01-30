'use strict';

var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var through = require('through2');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var server = require('gulp-express');

// Import our configured Metalsmith instance
var Doxx = require('@resin.io/doxx')
var defualtSettings
// data generator
var geny = require('./geny')

// cleans build destination folder
gulp.task('clean', function (cb) {
  return del([ './public/**' ], {dot: true}, cb)
});

// Process Sass
gulp.task('css', function() {
  return gulp.src('./static/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifycss())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./public/assets/'));
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
    .pipe(gulp.dest('./public/assets/'));
});

// simply copys images to /public folder
gulp.task('move-images', function(){
  return gulp.src([
      './static/images/**/*'
  ])
  .pipe(gulp.dest('./public/assets/images'));
})

// runs custom metalsmith build
gulp.task('doxx', function(done) {
  var doxxConfig = require('./config/doxx')
  geny.run(doxxConfig).then(function(newSettings) {
    var doxx = Doxx(newSettings)
    doxx.build(function(err) {
      if(err) throw err;
      // delete the require cache so we can get automatic data reloads
      delete require.cache[require.resolve('./config/doxx')]
      done()
    })
  })
});

// run server
gulp.task('serve', function (done) {
  server.run(['index.js']);
  gulp.watch(['./templates/**', './config/**', './shared/**', './pages/**'], gulp.series('build', 'reload'));
  gulp.watch('./static/styles/**', gulp.series('css', 'reload'));
  gulp.watch('./static/js/**', gulp.series('js', 'reload'));
  done()
})

gulp.task('reload', function(done) {
  // hack - have to pass a faux path to reload
  server.notify({ path : '/' })
  done()
})

// builds all static assets
gulp.task('build', gulp.series('clean', 'doxx', gulp.parallel('move-images', 'js', 'css')), function(done) {
  done()
})

// pull data build + serve
gulp.task('default', gulp.series('build', 'serve', 'reload'), function(done) {
  done()
})
