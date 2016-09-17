var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    prefix = require('gulp-autoprefixer'),
    minifycss = require('gulp-clean-css'),
    browserSync = require('browser-sync'),
    bourbon = require('bourbon').includePaths,
    neat = require('bourbon-neat').includePaths;

// Recompile SASS
gulp.task('sass', function () {
    return gulp.src('theme/sass/main.sass')
        .pipe(sass({
          includePaths: [bourbon, neat],  
          onError: browserSync.notify
        }).on('error', sass.logError))
        .pipe(prefix('last 2 versions'))
        .pipe(rename({suffix: '.min', prefix : ''}))
		    .pipe(minifycss())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream:true}));
});


// Recompile HTML
gulp.task('pug', function buildHTML() {
  return gulp.src('theme/pug/page/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest(''))
  .pipe(browserSync.reload({stream:true}));

});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'pug', 'jekyll-rebuild'], function() {
    browserSync({
        server: {
            baseDir: ''
        },
        port: 4000,
        notify: false
    });
});

// Watch Task
gulp.task('watch', function() {
  gulp.watch('theme/sass/**', ['sass']);
  gulp.watch('theme/pug/**/*.pug', ['pug']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
