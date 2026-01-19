String.prototype.indexOf = new Proxy(String.prototype.indexOf, {
  apply(Target: typeof String.prototype.indexOf, ThisArg: String, Args: Parameters<typeof String.prototype.indexOf>) {
    let Filter = 'win16|win32|win64|mac'
    if (typeof navigator.platform !== 'undefined' && typeof Args[0] === 'string' && navigator.platform.toLowerCase() === Args[0] && ThisArg.includes(Filter)) {
      return 16
    }
    return Reflect.apply(Target, ThisArg, Args)
  }
})

RegExp.prototype.test = new Proxy(RegExp.prototype.test, {
  apply(Target: typeof RegExp.prototype.test, ThisArg: RegExp, Args: Parameters<typeof RegExp.prototype.test>) {
    let Filter = 'win16|win32|win64|mac'
    if (typeof navigator.platform !== 'undefined' && typeof Args[0] === 'string' && navigator.platform === Args[0] &&
      ThisArg.source.toLowerCase().includes(Filter)) {
      return true
    }
    return Reflect.apply(Target, ThisArg, Args)
  }
})