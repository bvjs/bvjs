/**
 * download template
 */

const download = require('download-git-repo')
const ora = require('ora')
const path = require('path')
const config = require('./config')

module.exports = (template, clone) => {
  const spinner = ora('downloading template...').start()
  return new Promise((resolve, reject) => {
    download(`bv-templates/${template}`, path.join(config.templateLocalPath, template), { clone }, err => {
      spinner.stop()
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
