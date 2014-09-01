//Author Name:   Atul Sirpal
//Author email:  atul.kumar@spanservices.com
//Purpose:       Default gulp file which can be used in existing or new projects without much efforts.
                
var gulp = require('gulp');

//gulp tasks
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concatCss = require('gulp-concat-css');
var watch = require('gulp-watch');
var psi = require('psi');
var notify = require("gulp-notify");
var less = require("gulp-less");
var changed = require('gulp-changed');
var minifyHTML = require('gulp-minify-html');
var htmlmin = require('gulp-htmlmin');

//Source and Destination path of js,css and images files.
var jsSrc = 'Scripts/';
var jsDest = 'OptimizedScripts/';
var cssSrc = 'Css/';
var cssDest = 'OptimizedCss/';
var imagesSrc = 'images/';
var imagesDest = 'OptimizedImages/';


//To clean Solution i.e output javascript,Images folders
gulp.task('cleanSolution', function () {
    return gulp.src([jsDest,cssDest,imagesDest], { read: false })
        .pipe(clean());
});
/////////////////////////////////////////////////


//JS hint task
gulp.task('jshint', function () {
    gulp.src(jsSrc + '*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
/////////////////////////////////////////////////

//To compress javascript files
gulp.task('compressJs', function () {
    gulp.src(jsSrc + '*.js')
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
/////////////////////////////////////////////////

//Css Lint task
gulp.task('csslint', function () {
    gulp.src(cssSrc + '*.css')
        .pipe(csslint({
            'shorthand': true
        }))
        .pipe(csslint.reporter());
    });

//Concatenate css files
gulp.task('concat-css', function () {
    gulp.src([cssSrc + 'style1.css', cssSrc + 'style2.css'])
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest(cssDest));
});
/////////////////////////////////////////////////

//Minify Css file and rename file with min
gulp.task('compressCss', function () {
    gulp.src(cssSrc + '*.css')
        .pipe(minifyCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(cssDest));
});
/////////////////////////////////////////////////
//create css from less file
gulp.task('less', function () {
    gutil.log('task started');
    gulp.src(cssSrc + 'baseStyle.less')
        .pipe(less())
        .pipe(gulp.dest(cssDest));
});
/////////////////////////////////////////////////
//To compress or optimize images
gulp.task('compressImages', function () {
    gulp.src(imagesSrc + '*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest(imagesDest));
});
/////////////////////////////////////////////////

//To check the code at runtime.
gulp.task('watch', function () {
    gulp.watch(jsSrc + '*.js', function () {
        gulp.run('jshint');
    });
});

//Default task which performs all the tasks mentioned in array
gulp.task('default', ['cleanSolution', 'compressJs', 'compressCss', 'compressImages'], function () {

});

////////////////////////////////////////////////
//To test application for google  page speed insgights
gulp.task('psi', function (cb) {
    psi({
        nokey: 'true', // or use key: ‘YOUR_API_KEY’
        url: 'http://www.spansystems.com',
        strategy: 'mobile',
        threshold: 40
    }, cb);
});
