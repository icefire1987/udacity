var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('default', function() {
  console.log("hello")
});

gulp.task('live',["styles","lint"], function() {
	gulp.watch("sass/**/*.scss",["styles"]);
	gulp.watch("js/**/*.js",["lint"]);
	
	gulp.watch("index.html")
		.on("change",browserSync.reload);
	
	browserSync.init({
	    server: "./"
	});
	
});

gulp.task('watch',["styles","lint","scripts","copy-html","copy-images"], function() {
	gulp.watch("sass/**/*.scss",["styles"]);
	gulp.watch("js/**/*.js",["lint","scripts"]);
	gulp.watch("index.html",["copy-html"]);
	gulp.watch("img/*",["copy-images"]);
	
	gulp.watch("./dist/index.html")
		.on("change",browserSync.reload);
	
	browserSync.init({
	    server: "./dist"
	});
	
});




gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['js/**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});


gulp.task('styles', function(){
	gulp.src("sass/**/*.scss")
		.pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
		.pipe(autoprefixer({
			browser: ["last 5 versions"]
		}))
		.pipe(gulp.dest("./dist/css"))
		.pipe(browserSync.stream());
});
gulp.task('copy-html', function() {
	gulp.src("./index.html")
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function() {
	gulp.src("img/*")
	.pipe(gulp.dest('dist/img'));
});

gulp.task('scripts',function() {
	gulp.src('js/**/*.js')

		.pipe(concat('all.js'))

		.pipe(gulp.dest('./dist/js'))
});

gulp.task('scripts-dist',function() {
	gulp.src('js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest('./dist/js'))
});

gulp.task('optimg', function() {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('dist',
	[
	'copy-html',
	'copy-images',
	'styles',
	'lint',
	'scripts-dist'
	]
)

