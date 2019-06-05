/**
 * qiniu 配置文件
 * @param {String} cdn cdn类型
 * @param {String} bucket cdn服务配置（在cdn上可以查到）
 * @param {String} accessKey cdn服务配置（在cdn上可以查到）
 * @param {String} secretKey cdn服务配置（在cdn上可以查到）
 * @param {Object} glob 上传文件配置
 * @param {String} glob.pattern 匹配要上传的文件
 * @param {Array||String} glob.ignore 匹配要排除的文件
 */

module.exports = {
	cdn: 'qiniu',
  bucket: '',
  accessKey: '',
	secretKey: '',
	glob: {
		pattern: '',
		ignore: [],
	}
}