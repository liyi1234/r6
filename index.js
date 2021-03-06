var path = require('path');
var fs = require('fs');

module.exports = function(options) {
  var contextPath = '';

  if (options && options.contextPath) {
    contextPath = options.contextPath;
  }
  else {
    contextPath = path.dirname(require.main.filename);
  }

  var r6 = function(lib) {
    var absPath = path.join(contextPath, lib);

    var fileList = fs.readdirSync(path.dirname(absPath));
    var regex = new RegExp(path.basename(absPath) + '(\\.[Jj][Ss])?$');

    for (var i = 0; i < fileList.length; i++) {
      var file = fileList[i];

      if (file.match(regex)) {
        return require(absPath);
      }
    }
    // Return lib if file doesn't exist with
    // any .js extension possibilities
    return require(lib);
  };

  if (options && options.useGlobal === true) {
    GLOBAL.r6 = r6;
    return undefined;
  }

  return r6;
};
