# Usage Examples

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
    ]
  },
}
```

## CLI overwrite option

To override the overwrite option via the CLI pass it as an option

```shell
  grunt hardlink --overwrite
```

## Usage tips on Microsoft Windows

Make sure your command prompt has administrative privileges, otherwise
the task will not work.
