const path = require('path');
const log4js = require('koa-log4');
const RUNTIME_PATH = path.resolve(__dirname, '../');
const LOG_PATH = path.join(RUNTIME_PATH, 'log');

log4js.configure({
  // 日志的输出
  appenders: {
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', //生成文件的规则
      alwaysIncludePattern: true, // 文件名始终以日期区分
      encoding: 'utf-8',
      filename: path.join(LOG_PATH, 'access.log') //生成文件名
    },
    application: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join(LOG_PATH, 'application.log')
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: [ 'out' ], level: 'info' },
    access: { appenders: [ 'access' ], level: 'info' },
    // level 设置为 all，代表可以输出所有的级别的日志
    // 级别由高到低如下：
    // {
    //   ALL: new Level(Number.MIN_VALUE, "ALL"),
    //   TRACE: new Level(5000, "TRACE"),
    //   DEBUG: new Level(10000, "DEBUG"),
    //   INFO: new Level(20000, "INFO"),
    //   WARN: new Level(30000, "WARN"),
    //   ERROR: new Level(40000, "ERROR"),
    //   FATAL: new Level(50000, "FATAL"),
    //   MARK: new Level(9007199254740992, "MARK"), // 2^53
    //   OFF: new Level(Number.MAX_VALUE, "OFF")
    // }
    application: { appenders: [ 'application' ], level: 'all'}
  }
});

// getLogger 传参指定的是类型
exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('access')); // 记录所有访问级别的日志
// 记录所有应用级别的日志
// 支持以下用法
// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");
exports.logger = log4js.getLogger('application');
