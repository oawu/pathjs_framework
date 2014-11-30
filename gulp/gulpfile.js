var gulp = require ('gulp'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');

gulp.task ('default', function () {
  livereload.listen ();

  var watchFiles = ['./root/*.html', './root/view/**/*.html', './root/view/**/*.css', './root/view/**/*.js'].forEach (function (t) {
    gulp.watch (t).on ('change', function () {
      gulp.run ('reload');
    });
  });
});


gulp.task ('reload', function () {
  livereload.changed ();
  // gulp.src ('').pipe (notify ('✖ ReLoad Browser! ✖'));
  console.info ('\nReLoad Browser!\n');
});