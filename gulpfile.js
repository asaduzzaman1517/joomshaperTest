var gulp = require("gulp"),
  babel = require("gulp-babel"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync").create(),
  reload = browserSync.reload,
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  concat = require("gulp-concat"),
  imagemin = require("gulp-imagemin"),
  changed = require("gulp-changed"),
  uglify = require("gulp-uglify"),
  lineec = require("gulp-line-ending-corrector");

//Html
var htmlSrc = "src/**/*.html";
var htmlDist = "dist/";
var htmlWatch = "dist/**/*.html";

//style
var styleSrc = "src/sass/style.scss";
var styleDist = "dist/css/";
var styleWatch = "src/sass/**/*.scss";

//Js
var jsSrc = [
  "node_modules/jquery/dist/jquery.js",
  "node_modules/popper.js/dist/popper.js",
  "node_modules/bootstrap/dist/js/bootstrap.js",
  "src/js/**/*.js"
];
var jsDist = "dist/js/";

//Image
var imgSrc = "src/img/*";
var imgDist = "dist/img/";

//Font
var fontSrc = "src/font/*";
var fontDist = "dist/font/";

//Browser Sync
function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    },
    notify: false
  });
  gulp.watch(htmlSrc, html);
  gulp.watch(styleWatch, style);
  gulp.watch(jsSrc, javascript);
  gulp.watch(imgSrc, imgmin);
  gulp.watch(fontSrc, font);
  gulp
    .watch([htmlWatch, jsDist + "bundle.js", styleDist + "style.css"])
    .on("change", reload);
}

//Html
function html() {
  return gulp.src(htmlSrc).pipe(gulp.dest(htmlDist));
}

//Font
function font() {
  return gulp.src(fontSrc).pipe(gulp.dest(fontDist));
}

//Compile Sass
function style() {
  return gulp
    .src(styleSrc)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer("last 2 versions"))
    .pipe(sourcemaps.write("."))
    .pipe(lineec())
    .pipe(gulp.dest(styleDist));
}

//Js
function javascript() {
  return gulp
    .src(jsSrc)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(lineec())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(jsDist));
}

//Image
function imgmin() {
  return gulp
    .src(imgSrc)
    .pipe(changed(imgDist))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest(imgDist));
}

//Deafault Task
var build = gulp.parallel(watch);
gulp.task("default", build);
