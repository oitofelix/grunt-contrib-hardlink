/*
 * grunt-hardlink
 * https://github.com/oitofelix/grunt-hardlink
 *
 * Copyright (c) 2015 Bruno Félix Rezende Ribeiro (oitofelix@gnu.org)
 * Copyright (c) 2015 Grunt Team
 *
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var fs = require('fs');
  var path = require('path');

  grunt.registerMultiTask('hardlink', 'Create hard links.', function() {
    var nowrite = grunt.option('no-write');
    var linkCount = 0;

    // default options
    var options = this.options({
      overwrite: false,
      force: false
    });

    // overwrite options from CLI
    options.overwrite = grunt.option('overwrite') || options.overwrite;

    // force options from CLI
    options.force = grunt.option('force') || options.force;

    this.files.forEach(function(f) {
      var srcpath = f.src[0];
      var destpath = f.dest;
      if (!grunt.file.exists(srcpath)) {
        grunt.log.warn('Source file "' + srcpath + '" not found.');
        return;
      } else if (grunt.file.exists(destpath)) {
        if (!options.overwrite) {
          grunt.log.warn('Destination ' + destpath + ' already exists.');
          return;
        }
        grunt.file.delete(destpath, {force: options.force});
      }
      // Strip any trailing slashes.
      destpath = destpath.replace(/[\\\/]$/, '');
      // The destdir is the location in which the hardlink will be created.
      var destdir = path.join(destpath, '..');
      // Create any necessary interim directories.
      grunt.file.mkdir(destdir);
      try {
        if (!nowrite) {
          fs.linkSync(srcpath, destpath);
        }
        grunt.verbose.ok();
      } catch(e) {
        grunt.verbose.error();
        grunt.log.error(e);
        grunt.fail.warn('Failed to create hardlink: ' + destpath + ' -> ' + srcpath + '.');
      }
      linkCount++;
    });
    grunt.log.ok('Created ' + linkCount + ' hard links.');
  });

};
