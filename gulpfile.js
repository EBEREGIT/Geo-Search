// import
const gulp = require("gulp");
const jshint = require("gulp-jshint");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const runSequence = require("run-sequence");
const browserSync = require("browser-sync").create();

// tasks
gulp.task("processHTML", () => {
  gulp.src("*.html").pipe(gulp.dest("dist"));
});

gulp.task("processCSS", () => {
  gulp.src("*.css").pipe(gulp.dest("dist"));
});

gulp.task("processJS", () => {
  gulp
    .src("*.js")
    .pipe(
      jshint({
        esversion: 6
      })
    )
    .pipe(jshint.reporter("default"))
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});

gulp.task("babelPolyfill", () => {
  gulp
    .src("node_modules/babel-polyfill/browser.js")
    .pipe(gulp.dest("dist/node_modules/babel-polyfill"));
});

gulp.task("default", callback => {
  runSequence(["processHTML", "processJS", "babelPolyfill"], callback);
});

gulp.task("watch", ["browserSync"], () => {
  gulp.watch("*.js", ["processJS"]);
  gulp.watch("*.html", ["processHTML"]);
  gulp.watch("*.css", ["processCSS"]);

  gulp.watch("dist/*.js", browserSync.reload);
  gulp.watch("dist/*.html", browserSync.reload);
});

gulp.task("default", callback => {
  runSequence(["processHTML", "processCSS", "processJS", "babelPolyfill"], "watch", callback);
});

gulp.task("browserSync", () => {
  browserSync.init({
    server: "./dist",
    port: 8080,
    ui: {
      port: 8081
    }
  });
});
