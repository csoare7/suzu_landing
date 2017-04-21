var gulp     = require('gulp');
var order    = require('gulp-order');
var concat   = require('gulp-concat');
var rename   = require('gulp-rename');
var uglify   = require('gulp-uglify');
var clean    = require('gulp-clean');
var cleanCSS = require('gulp-clean-css');
var cache    = require('gulp-cache');
var prefix   = require('gulp-autoprefixer');
/*var imageop  = require('gulp-image-optimization');*/

/* js files */

var jsFiles = [
  "jquery-2.1.4.min.js",
  "bootstrap.min.js",
  "particle.min.js",
  "waypoints.min.js",
  "waypoints-sticky.min.js",
  "retina.min.js",
  "jquery.magnific-popup.min.js",
  "main.js"
];

var jsDir = "js/*.js";
var jsDest = 'build/js';

/* css files */

var cssDir = 'css/*.css';
var cssDest = 'build/css';

/* img files */

var imgDir = 'img/*';
var imgDest = 'img';

/* tasks */

gulp.task('js', function(){
  return gulp.src(jsDir)
    .pipe(order(jsFiles), {base: 'js'})
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(clean({force: true, read: false}))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

gulp.task('css', function(){
  return gulp.src(cssDir)
    .pipe(prefix({browsers: ['> 1%', 'last 4 versions']}))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(cssDest))
    .pipe(clean({force: true, read: false}))
    .pipe(rename('styles.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8', keepSpecialComments: 0}))
    .pipe(gulp.dest(cssDest));
});

/*gulp.task('img', function() {
  return gulp.src(imgDir)
    .pipe(cache(imageop({optimizationLevel: 5, progressive: true, interlaced: true})))
    .pipe(gulp.dest(imgDest));
});*/

gulp.task('default', ['js','css'], function(){});
