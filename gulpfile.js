"use strict"

const gulp = require('gulp')
const sass = require('gulp-sass')
const terser = require('gulp-terser')
const minifycss = require("gulp-minify-css")

const browserSync = require("browser-sync").create()

const output = 'dist'

gulp.task('scss', () => {
    return gulp.src('src/css/*.scss')
        .pipe(sass({ outputStyle: 'compressed' })
            .on('error', sass.logError))
        .pipe(minifycss())
        .pipe(gulp.dest(output))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task("js", () => {
    return gulp.src("src/js/*.js")
        .pipe(terser())
        .pipe(gulp.dest(output))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task("html", () => {
    return gulp.src("src/index.html")
        .pipe(gulp.dest(output))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task("sync", () => {

    browserSync.init({
        open: "external",
        port: 4200,
        server: { baseDir: output },
        injectChanges: true,
        ui: { port: 4201 }
    })

    gulp.watch("src/css/*.scss", gulp.series("scss"))
    gulp.watch("src/js/*.js", gulp.series("js"))
    gulp.watch("src/index.html", gulp.series("html"))
})

gulp.task('build', gulp.series(['html', 'scss', 'js']))