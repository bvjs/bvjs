/**
 * 获取本地git用户信息
 * 这里主要是name与email
 * 返回：XXX <XXX@163.com>
 */
const exec = require('child_process').execSync

module.exports = () => {
  let name
  let email

  try {
    name = exec('git config --get user.name')
    email = exec('git config --get user.email')
  } catch (e) {}

  name = name && JSON.stringify(name.toString().trim()).slice(1, -1)
  email = email && (' <' + email.toString().trim() + '>')
  return (name || '') + (email || '')
}
