const async = require('async')
const render = require('consolidate').handlebars.render
const multimatch = require('multimatch')

/**
 * Create a middleware for render template files
 *
 * @param {Object} skipInterpolation
 */

module.exports = skipInterpolation => {
  skipInterpolation = typeof skipInterpolation === 'string'
    ? [skipInterpolation]
    : skipInterpolation
  return (files, metalsmith, done) => {
    renderTemplateFiles(skipInterpolation, files, metalsmith, done)
  }
}

/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function renderTemplateFiles(skipInterpolation, files, metalsmith, done) {
  const keys = Object.keys(files)
  const metalsmithMetadata = metalsmith.metadata()
  async.each(keys, (file, next) => {
    // skipping files with skipInterpolation option
    if (skipInterpolation && multimatch([file], skipInterpolation, { dot: true }).length) {
      return next()
    }
    const str = files[file].contents.toString()
    // do not attempt to render files that do not have mustaches
    if (!/{{([^{}]+)}}/g.test(str)) {
      return next()
    }
    render(str, metalsmithMetadata, (err, res) => {
      if (err) {
        err.message = `[${file}] ${err.message}`
        return next(err)
      }
      files[file].contents = Buffer.from(res)
      next()
    })
  }, done)
}