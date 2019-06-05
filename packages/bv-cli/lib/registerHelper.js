/**
 * register helper
 */
const Handlebars = require('handlebars')

Handlebars.registerHelper('if_eq', function (a, b, opts) {
  return a === b
    ? opts.fn(this)
    : opts.inverse(this)
})

Handlebars.registerHelper('unless_eq', function (a, b, opts) {
  return a === b
    ? opts.inverse(this)
    : opts.fn(this)
})

module.exports = Handlebars.registerHelper.bind(Handlebars)