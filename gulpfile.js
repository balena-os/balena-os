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

var server = require('gulp-express');

// Import our configured Metalsmith instance
var Doxx = require('@resin.io/doxx')
var defualtSettings
// data generator
var geny = require('./geny')
var destDir = './public'
var doxxConfig

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
    .pipe(gulp.dest('./static/dist/'));
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
  .pipe(gulp.dest('./static/dist/'));
});

// runs custom metalsmith build
gulp.task('doxx', function(done) {
  var doxxConfig = require('./config/doxx')
  var doxx = Doxx(doxxConfig)
  doxx.build(function(err) {
    if(err) throw err;
    delete require.cache[require.resolve('./config/doxx')]
    done()
  })
});

// pulls data
gulp.task('data', function(done) {
  // pulls in new data and settings incase they have changed
  var defualtSettings = require('./config/locals')
  geny.run(defualtSettings).then(function(newSettings) {
    // writes updates to config/locals.json
    done()
  })
});

// run server
gulp.task('serve', function (done) {
  server.run(['index.js']);
  gulp.watch(['./templates/**', './shared/**', './pages/**'], gulp.series('doxx', 'reload'));
  // gulp.watch(['./config/**'], gulp.series('data', 'doxx', 'reload'));
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
gulp.task('build', gulp.series('clean', 'doxx', 'js', 'css'), function(done) {
  done()
})

// pull data build + serve
gulp.task('dev', gulp.series('data', 'build', 'serve', 'reload'), function(done) {
  done()
})
