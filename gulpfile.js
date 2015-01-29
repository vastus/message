var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('js', function () {
  return browserify('./src/js/main.js', { debug: true })
    .transform(reactify)
    .bundle().on('error', handleError)
    .pipe(source('application.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', ['js'], function () {
  gulp.watch(['./src/js/**/*.js'], ['js']);
});

gulp.task('default', ['watch']);

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}
