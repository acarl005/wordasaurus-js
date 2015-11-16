var gulp = require('gulp');
var browserify = require('browserify');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var notify = require('gulp-notify');
var rename = require('gulp-rename');

gulp.task('default', ['script-dev', 'sass-dev', 'serve']);
gulp.task('build', ['script', 'sass']);

gulp.task('serve', () => {
  nodemon({
    script: 'server/server.js',
    ext: 'js',
    watch: ['server/', 'public/']
  });
});

gulp.task('sass-dev', () => {
  gulp.src('src/sass/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    // .pipe(concat('style.css'))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('public/build/'));
});

gulp.task('sass', () => {
  
});

gulp.task('script-dev', () => buildScript('main.js', true));
gulp.task('script', () => buildScript('main.js', false));

function buildScript(file, watch) {

  var props = {
    entries : ['src/js/' + file],
    debug : true,
    transform: [
      ['babelify', { presets: ['es2015'] }],
    ],
  };

  var bundler;
  if (watch) {
    bundler = watchify(browserify(props));
  } else {
    bundler = browserify(props).transform({
      global: true
    }, 'uglifyify');
  }

  function rebundle(){
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('public/build/'));
  }

  bundler.on('update', function() {
    var now = new Date;
    var updateStart = now.valueOf();
    var time = '\033[30m' + `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` + '\033[0m';
    rebundle();
    console.log('[' + time + '] \033[32m[watchify] Updated!', (Date.now() - updateStart) + 'ms\033[0m');
  })

  // run it once the first time buildScript is called
  return rebundle();
}

function handleErrors() {
  notify.onError({
    title : 'Compile Error',
    message : '<%= error.message %>'
  }).apply(this, arguments);

  this.emit('end'); //keeps gulp from hanging on this task
}