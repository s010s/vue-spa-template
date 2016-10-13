var gulp = require('gulp'),
  copy = require('copy'),
  prompt = require('gulp-prompt'),
  runSeq = require('run-sequence'),
  rename = require('gulp-rename'),
  zip = require('gulp-zip'),
  glob = require('glob'),
  del = require('del')

var PACKAGEPATH = 'pkg/', //打包压缩输出路径
  TEMPPATH = 'pkg/tmp/', //环境列表
  ENVLIST = ['测试', '正式'], //环境列表
  PROJECTNAME = '兜兜运动', //项目名称
  version = '', //版本号
  env = '', //环境
  zipName = '', //压缩包名
  zipDir = '', //压缩包所在文件夹
  zipPath = '' //压缩包路径

Date.prototype.format = function(fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function runPrompt(_hint, _callback) {
  gulp.src('*')
    .pipe(prompt.prompt({
      type: 'input',
      name: 'content',
      message: _hint + ':'
    }, function(res) {
      if (res.content) {
        _callback(res.content);
      } else {
        _callback(null);
      }
    }))
}

var d = new Date().format('yyyyMMddhhmmss')
console.log(d)

gulp.task('default', function(cb) {
  del(TEMPPATH + '*')
  runSeq(
    'setProjectName',
    'setEnv',
    'listTopTenPkg',
    'setVersion',
    'beforeZip',
    'copy',
    'zip',
    cb
  )
});

gulp.task('setProjectName', function(cb) {
  if (!PROJECTNAME) {
    inputPName()
  } else {
    isUseDefault()
  }

  function isUseDefault() {
    runPrompt('The default project name is ' + PROJECTNAME + '. continue use it ?\n0----->no\n1----->yes\n', function(res) {
      if (res === '1') {
        console.log('The Project Name is ' + PROJECTNAME)
        return cb()
      } else if (res === '0') {
        inputPName()
      } else {
        console.log('Please check your input.\n0----->no\n1----->yes\n')
        isUseDefault()
      }
    })
  }

  function inputPName() {
    runPrompt('Please input your project name.\n', function(res) {
      if (!res) {
        console.log('Please check your input.')
        inputPName()
      } else {
        PROJECTNAME = res
      }
      console.log('The Project Name is ' + PROJECTNAME)
      return cb()
    })
  }
})

gulp.task('setEnv', function(cb) {
  var str = '',
    count = ENVLIST.length

  ENVLIST.forEach(function(v, i) {
    str += i + ' -----> ' + v + '\n'
  })

  chooseEnv()

  function chooseEnv() {
    runPrompt('Please choose the environment: \n' + str, function(res) {
      var reg = new RegExp('(^0$)|(^1$)');
      if (!reg.test(res)) {
        console.log('Please check your input. ')
        chooseEnv()
      } else {
        env = ENVLIST[res]
        console.log('The environment is ' + env)
        return cb()
      }
    })
  }
})

gulp.task('listTopTenPkg', function(cb) {
  var count = 0
  glob(PACKAGEPATH + '测试' + '/*.zip', function(er, files) {
    files = files.sort(function(a,b){
      var v_a = a.split('/')[a.split('/').length-1].split('.').slice(0,3)
      var v_b = b.split('/')[b.split('/').length-1].split('.').slice(0,3)
    })
    count = files.length >= 10 ? 10 : files.length
    if (count === 0) {
      console.log('There is no relative package.')
    } else {
      console.log('Here is the lastest ' + count + ' package:')
    }
    for (var i = 0; i < count; i++) {
      console.log(files[i])
    }
  })
  return cb()
});

gulp.task('setVersion', function(cb) {
  setVersion()

  function setVersion() {
    runPrompt('Please input the version. For example 0.0.0.1\n', function(res) {
      var reg = new RegExp(/^([1-9]\d*|0)\.([1-9]\d*|0)\.([1-9]\d*|0)\.([1-9]\d*|0)$/)
      if (!reg.test(res)) {
        console.log('Please check your input.')
        setVersion()
      } else {
        version = res
        console.log('The version is ' + version)
        return cb()
      }
    })
  }
})

gulp.task('beforeZip', function(cb) {
  zipName = PROJECTNAME + '_' + env + '_' + version
  zipDir = PACKAGEPATH + env + '/'
  zipPath = zipDir + zipName + '.zip'

  glob(zipPath, function(err, files) {
    if (files.length) {
      console.log('you already have a zip named ' + zipName + ' .It was renamed ' + zipName + '_old')
      gulp.src(zipPath)
        .pipe(rename(zipName + '_old' + '.zip'))
        .pipe(gulp.dest(zipDir))
    }
  })

  return cb()
})

gulp.task('copy', function(cb) {
  return gulp.src('index.html').pipe(gulp.dest(TEMPPATH)) && gulp.src('platform/*').pipe(gulp.dest(TEMPPATH + '/platform')) && gulp.src('build/*').pipe(gulp.dest(TEMPPATH + '/build'))
});

gulp.task('zip', function(cb) {
  return gulp.src(TEMPPATH + '**')
    .pipe(zip(zipName + '.zip'))
    .pipe(gulp.dest(zipDir));
})
