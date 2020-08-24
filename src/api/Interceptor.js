
export function requestSuccessFunc (config) {
  //请求之前可在这里更改默认配置
  return config
}

export function requestFailFunc (requestError) {
  // 自定义发送请求失败逻辑，断网，请求发送监控等
  // ...
  return Promise.reject(requestError);
}

export function responseSuccessFunc (responseObj) {

  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  // ...
  return Promise.resolve(responseObj);

}

export function responseFailFunc (responseError) {
  // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
  // ...
  return Promise.reject(responseError);
}
