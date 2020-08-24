/**
 * @Description: 根据process.argv 区分环境
 * 测试环境打包  npm run build test
 * 准生产打打包  npm run build qas
 * 生产打包      npm run build pro
 * @author  shangguanqingyun
 * @date 2019/4/16
 */

const buildType = process.argv.slice(2)[0]

console.log('-----------start build buildType---------' + buildType)

let envUrl
switch (buildType) {
  case 'test':
    envUrl = '"/api"'
    break
  case 'qas':
    envUrl = '"准生产环境地址"'
    break
  case 'pro':
    envUrl = '"正式环境地址"'
    break
  default:
    envUrl = '"/api"'
}

module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: envUrl
}
