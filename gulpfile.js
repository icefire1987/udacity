var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('default', function() {
  console.log("hello")
});

gulp.task('watch', function() {
	gulp.watch("sass/**/*.scss",["styles"]);
	  
	browserSync.init({
	    server: "./"
	});
	
});




gulp.task('styles', function(){
	gulp.src("sass/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			browser: ["last 5 versions"]
		}))
		.pipe(gulp.dest("./css"))
		.pipe(browserSync.stream());
});