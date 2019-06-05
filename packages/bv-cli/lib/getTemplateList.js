/**
 * 获取可用模板列表
 */

const logger = require('../lib/logger')
const request = require('request')
const ora = require('ora')

module.exports = () => {
  return new Promise(resolve => {
    console.log()
    const spinner = ora('find templates...')
    spinner.start()
    request({
      url: 'https://api.github.com/users/bv-templates/repos',
      headers: {
        'User-Agent': 'bv-cli'
      },
    }, (err, res, body) => {
      spinner.stop()
      // 报错并退出
      if (err) logger.error(err)
      // 可用模板列表
      const templates = JSON.parse(body)
      if (Array.isArray(templates)) {
        resolve(templates)
      } else {
        console.error(templates.message)
      }
    })
  })
}
