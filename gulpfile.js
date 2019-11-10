'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    pump = require('pump');

var path = {
    src: {
        js: './src/*.js',
    },
    build: {
        js: './',
    }
};

gulp.task('build', function (cb) {
    pump([
            gulp.src(path.src.js),
            uglify(),
            rename(function (path) {
                path.extname = (".min" + path.extname).toLowerCase();
                console.log(path);
            }),
            gulp.dest(path.build.js)
        ],
        cb
    );
});

gulp.task('default', ['build']);