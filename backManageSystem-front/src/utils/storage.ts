interface strorageFunType {
  getItem(key: string): any
  setItem(key: string, value: string): void
  removeItem(key: string): void
  clear(): void
}

// sessionStorage  因为每次进行对象存储的时候要进行转化就很麻烦，所以每次就封装函数直接调用
class localStorageProxy implements strorageFunType {
  private storage: strorageFunType
  constructor(storageModel: strorageFunType) {
    this.storage = storageModel
  }
  getItem(key: string): any {
    return JSON.parse(this.storage.getItem(key)) || null
  }
  setItem(key: string, value: string): void {
    this.storage.setItem(key, JSON.stringify(value))
  }
  removeItem(key: string): void {
    this.storage.removeItem(key)
  }
  clear(): void {
    this.storage.clear()
  }
}
// 本地储存也一样，只要继承一次就行
class sessionStorageProxy extends localStorageProxy implements strorageFunType {
  constructor(sessionStorage: strorageFunType) {
    super(sessionStorage)
  }
}

export const storageLocal = new localStorageProxy(localStorage) //调用系统的Local
export const storageSession = new sessionStorageProxy(sessionStorage)
