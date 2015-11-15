var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var source = require('vinyl-source-stream');

gulp.task('default', ['script-dev', 'sass-dev', 'serve']);

gulp.task('serve', () => {
  nodemon({
    script: 'server/server.js',
    ext: 'js',
    watch: ['server/', 'public/build/']
  })
  .on('restart', () => console.log('restarting server'));
});

gulp.task('sass-dev', () => {
  
});

gulp.task('script-dev', buildScript.bind(this, 'main.js', true));

function buildScript(file, watch) {
  var props = {
    entries : ['src/js/' + file],
    debug : true,
    transform: [
      ['babelify', { presets: ['es2015'] }],
    ],
  };

  //watchify if watch set to true. otherwise browserify once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle(){
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('public/build/'));
  }

  bundler.on('update', function() {
    var updateStart = Date.now();
    rebundle();
    console.log('Updated!', (Date.now() - updateStart) + 'ms');
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