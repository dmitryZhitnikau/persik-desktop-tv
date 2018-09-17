const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('compile', () => {
  return gulp.src('src/**/*.es6')
    .pipe(babel())
    .pipe(gulp.dest('src'));
});

gulp.task('compile-test', () => {
  return gulp.src('test/**/*.spec.es6')
    .pipe(babel())
    .pipe(gulp.dest('test'));
});