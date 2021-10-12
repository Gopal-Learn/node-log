const router = require('koa-router')()
const { logger } = require('../utils/logger')

router.get('/', async (ctx, next) => {
  logger.info('我是首页');
  logger.error('我是一个错误');
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
