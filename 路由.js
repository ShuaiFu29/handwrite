class HashRouter {
  constructor() {
    // 存储路径与回调函数的映射
    this.routes = {}
    this.currentUrl = ''
    // 绑定this 防止指向丢失
    this.refresh = this.refresh.bind(this)
    // 监听load 和hashchange 事件
    window.addEventListener('load', this.refresh)
    window.addEventListener('hashchange', this.refresh)
  }
  // 注册路由
  route(path, callback) {
    this.routes[path] = callback || function () { }
  }
  // 刷新页面逻辑
  refresh() {
    // 获取当前hash 去掉 # 号
    this.currentUrl = location.hash.slice(1) || '/'
    // 执行对应的回调函数 （渲染 UI）
    if (this.routes[this.currentUrl]) {
      this.routes[this.currentUrl]()
    }
  }
}


class HistoryRouter {
  constructor() {
    this.routes = {}
    this.bindPopState()
    this.initLinkHijack()
    // 页面首次加载时，渲染当前路径对应的视图
    this.updateView(location.pathname)
  }

  route(path, callback) {
    this.routes[path] = callback || function () { }
  }

  // 监听浏览器自带的前进后退
  bindPopState() {
    window.addEventListener('popstate', () => {
      let path = location.pathname
      this.updateView(path)
    })
  }

  // 拦截全局点击事件，处理 link 跳转
  initLinkHijack() {
    document.addEventListener('click', (e) => {
      // 使用 e.target 并向上查找，确保能正确处理 a 标签内的子元素
      let target = e.target
      while (target && target.tagName !== 'A') {
        target = target.parentElement
      }

      // 如果找到了 a 标签，并且 href 属性存在
      if (target && target.tagName === 'A' && target.getAttribute('href')) {
        e.preventDefault() // 阻止 a 标签的默认跳转行为
        let path = target.getAttribute('href')
        history.pushState(null, null, path) // 修改 URL，不刷新页面
        this.updateView(path) // 手动更新视图
      }
    })
  }

  updateView(path) {
    if (this.routes[path]) {
      this.routes[path]()
    } else {
      // 可选：处理 404 的情况
      console.log('404 - Page Not Found')
    }
  }
}