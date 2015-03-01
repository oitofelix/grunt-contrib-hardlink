# grunt-contrib-hardlink v0.1.0

> Create hard links.



## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-hardlink --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-hardlink');
```




## Hardlink task
_Run this task with the `grunt hardlink` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide. Pay special attention to the [Building the files object dynamically](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) section, which explains how to create many src-dest file mappings all at once.


### Usage Examples

```js
hardlink: {
  // Enable overwrite to delete hardlinks before recreating them
  options: {
    overwrite: false
  },
  // The "build/target.txt" hardlink will be created and linked to
  // "source/target.txt".
  explicit: {
    src: 'source/target.txt',
    dest: 'build/target.txt'
  },
  // These examples using "expand" to generate src-dest file mappings:
  // http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
  expanded: {
    files: [
      // All child files in "source", starting with "foo-" will be hardlinked
      // into the "build" directory, with the leading "source" stripped off.
      // Note that it is not generally possible to hardlink directories, so
      // using "isFile" filter is often a necessary measure to avoid this kind
      // of error.
      {
        expand: true,
        overwrite: false,
        cwd: 'source',
        src: ['foo-*'],
        dest: 'build',
	filter: 'isFile',
      },
      // All files inside "bar" and its sub-directories, recursively, will be
      // hardlinked into an identical hierarchy under the "tmp" directory.
      {
	expand: true,
	src: 'bar/**',
	dest: 'tmp',
	filter: 'isFile',
      }
    ]
  },
}
```

#### CLI overwrite option

To override the overwrite option via the CLI pass it as an option

```shell
  grunt hardlink --overwrite
```

#### Usage tips on Microsoft Windows

Make sure your command prompt has administrative privileges, otherwise
the task will not work.


## Release History

 * 2015-03-01   v0.1.0   Unofficial release.

---

Task submitted by [Bruno Félix Rezende Ribeiro](http://oitofelix.freeshell.org/)

*This file was generated on Sun Mar 01 2015 08:37:35.*
