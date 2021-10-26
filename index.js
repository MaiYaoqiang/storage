class Storage {
  /**
   * @param {string} namespace
   * @param {Object} options
   * @param {boolean} options.setJson
   * @param {'localStorage'|'sessionStorage'} options.storage
   * */
  constructor(namespace,{
    storage='localStorage',
    setJson = true,
  } = {}) {
    this.setJson = setJson
    this.namespace = namespace
    if (storage === 'localStorage') {
      this.storage = localStorage
    } else if (storage === 'sessionStorage') {
      this.storage = sessionStorage
    } else {
      throw new Error('storage只能是localStorage或sessionStorage')
    }
  }

  /**
   * 获取一个值
   * @param {string} key
   * @return {*}
   */
  getItem(key) {
    key = `${this.namespace}-${key}`
    let value = this.storage.getItem(key)
    if (!value) {
      return null
    }
    if (this.setJson) {
      try {
        value = JSON.parse(value)
      } catch (e) {
        console.log(e)
      }
    }
    return value
  }

  /**
   * 存储一个值
   * @param {string} key
   * @param value
   */
  setItem(key, value) {
    key = `${this.namespace}-${key}`
    if (this.setJson) {
      try {
        value = JSON.stringify(value)
      } catch (e) {
        console.log(e);
      }
    }
    this.storage.setItem(key, value)
  }

  /**
   * 删除一个值
   * @param {string} key
   */
  removeItem(key) {
    key = `${this.namespace}-${key}`
    this.storage.removeItem(key)
  }

  /**
   * 清空所有值（当前项目命名空间下的key值）
   */
  clear() {
    const len = this.storage.length
    const keys = []

    for (let i = 0; i < len; i++) {
      const key = this.storage.key(i)
      if (key && key.startsWith(`${this.namespace}-`)) {
        keys.push(key)
      }
    }

    keys.map(key => this.storage.removeItem(key))
  }
}

export default Storage
