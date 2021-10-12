const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const { accessLogger, logger } = require('./utils/logger');
// error handler
onerror(app)
app.use(accessLogger())
// app.use(logger((str, args) => {
//   console.log(new Date() + str)
//   // redirect koa logger to other output pipe
//   // default is process.stdout(by console.log function)
// }))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  logger.error(err);
  console.error('server error', err, ctx)
});

module.exports = app
