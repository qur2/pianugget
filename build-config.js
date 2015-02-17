module.exports = {
  // A separate bundle will be generated for each bundle config.
  // Each x-property is an extension used by the build script.
  // The prefix ensures no confusion with browserify options.
  bundleConfigs: [{
    xtarget:    'dist/js/app.js',
    xtransform: ['6to5ify'],
    entries:      './src/app.js',
    extensions:   ['.js'],
    debug: true
  }]
};
