const chalk = require('chalk')
const Metalsmith = require('metalsmith')
const handlebars = require('consolidate').handlebars
const path = require('path')
const getMetadata = require('./getMetadata')
const ask = require('./ask')
const render = require('./render')
const filter = require('./filter')
const logger = require('./logger')
const registerHelper = require('./registerHelper')
/**
 * Generate a template
 * 
 * @param {String} name init arg[0]
 * @param {String} src copy from
 * @param {String} dest copy to
 */

module.exports = (name, src, dest) => new Promise((resolve, reject) => {
  const metadata = getMetadata(name, src)
  const metalsmith = Metalsmith(path.join(src, 'template'))
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    inplace: dest === process.cwd(),
    noEscape: true
  })

  if(metadata.helpers) {
    Object.keys(metadata.helpers).map(key => {
      registerHelper(key, metadata.helpers[key])
    })
  }

  // lifecycle param
  const args = [metalsmith, metadata, { chalk, logger }]
  // metalsmith: { before(){} }
  if (metadata.metalsmith && typeof metadata.metalsmith.before === 'function') {
    metadata.metalsmith.before(...args)
  }
  
  metalsmith
    .use(ask(metadata.prompts))
    .use(filter(metadata.filters))
    .use(render(metadata.skipInterpolation))

  // metalsmith() {}
  if (typeof metadata.metalsmith === 'function') {
    metadata.metalsmith(...args)
  } else if (metadata.metalsmith && typeof metadata.metalsmith.after === 'function') { // metalsmith: { after() {}}
    metadata.metalsmith.after(...args)
  }

  metalsmith
    .clean(false)
    .source('.')
    .destination(dest)
    .build((err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
      // lifecycle
      if (typeof metadata.complete === 'function') {
        metadata.complete(data, { chalk, logger, files })
      } else {
        logMessage(metadata.completeMessage, data)
      }
    })
})

/**
 * Display template complete message.
 *
 * @param {String} message
 * @param {Object} data
 */

function logMessage(message, data) {
  if (!message) return
  handlebars.render(message, data, (err, res) => {
    if (err) {
      console.error('\n   Error when rendering template complete message: ' + err.message.trim())
    } else {
      console.log('\n' + res.split(/\r?\n/g).map(line => '   ' + line).join('\n'))
    }
  })
}
