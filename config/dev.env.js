/**
 * @Description: 开发环境地址
 * @author  shangguanqingyun
 * @date 2019/4/16
*/

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://10.0.20.197:14602"'
})
