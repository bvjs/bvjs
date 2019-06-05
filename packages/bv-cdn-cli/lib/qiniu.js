/**
 * 支持七牛云
 */
const qiniu = require('qiniu')
const logger = require('./logger')

module.exports = ({
  accessKey,
  secretKey,
  bucket,
}) => {
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const options = {
    scope: bucket,
    expires: 7200
  }

  const putPolicy = new qiniu.rs.PutPolicy(options)

  if (!process.env.QINIU_UPLOAD_TOKEN) {
    process.env.QINIU_UPLOAD_TOKEN = putPolicy.uploadToken(mac)
  }

  const config = new qiniu.conf.Config()
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()

  return (key, localFile) => new Promise((resolve, reject) => {
    // 上传文件
    formUploader.putFile(
      process.env.QINIU_UPLOAD_TOKEN,
      key,
      localFile,
      putExtra,
      (respErr, respBody, respInfo) => {
        if (respErr) {
          reject(respErr)
        } else {
          if(respInfo.status === 200 && respInfo.statusCode === 200) {
            resolve(respBody)
          } else {
            reject(respBody.error)
          }
        }
      }
    )
  })
}
