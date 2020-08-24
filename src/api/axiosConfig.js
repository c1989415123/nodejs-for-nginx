import axios from 'axios'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'
import _isUndefined from 'lodash/isUndefined'
import {assert} from '@/utils'
import API_CONFIG from '@/api/apiConfig'
import DEFAULT_CONFIG from '@/api/defaultConfig'
import COMMON_PARAM from '@/api/commonParam'

import {requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc} from './Interceptor'

//axios 默认配置
const AXIOS_DEFAULT_CONFIG = DEFAULT_CONFIG

let axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

// 请求拦截
axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc)
// 响应拦截
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc)

const API_DEFAULT_CONFIG = {
  debug: true,
  sep: '/'
}


class MakeApi {
  constructor(options) {
    this.api = {}
    this.apiBuilder(options)
  }

  apiBuilder({
               sep = '|',
               config = {},
               debug = false,
             }) {
    Object.keys(config).map(namespace => {
      this._apiSingleBuilder({
        namespace,
        sep,
        debug,
        config: config[namespace]
      })
    })
  }

  _apiSingleBuilder({
                      namespace,
                      sep = '|',
                      config = {},
                      debug = false,
                    }) {
    config.forEach(api => {
      let {name, method, params, path, baseURL, withUrl, takeCommon} = api
      let apiname = `${namespace}${sep}${name}`,
        url = path,
        axiosParams
      if (_isUndefined(takeCommon)) {
        takeCommon = true
      }
      debug && assert(name, `${url} :接口name属性不能为空`)
      debug && assert(url.indexOf('/') === 0, `${url} :接口路径path，首字符应为/`)
      Object.defineProperty(this.api, apiname, {

        /**
         * 定义值为函数,返回的是axios实例
         * @param outerParams外部传进来的参数 {Object}
         * @param outerOptions外部传进来的配置 {Object}
         * @returns {AxiosPromise}
         */
        value(outerParams, outerOptions) {
          let _data = _isEmpty(outerParams) ? params : _assign({}, params, outerParams)
          if (!_isEmpty(COMMON_PARAM) && takeCommon) {
            _data = _assign({}, COMMON_PARAM, _data)
          }
          let _options = baseURL ? {url, baseURL, method} : {url, method}
          if (withUrl) {
            axiosParams = _assign({
              url: url + '?' + qs.stringify(_data),
              method,
            }, outerOptions)
          } else {
            axiosParams = _normoalize(_assign(_options, outerOptions), _data)
          }
          return axiosInstance(axiosParams)
        }
      })
    })
  }
}

function _normoalize(options, data) {
  if (options.method === 'POST') {
    options.data = data
  } else if (options.method === 'GET') {
    options.params = data
  }
  return options
}

export default new MakeApi({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG
})['api']
