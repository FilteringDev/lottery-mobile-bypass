String.prototype.indexOf = new Proxy(String.prototype.indexOf, {
  apply(Target: typeof String.prototype.indexOf, ThisArg: String, Args: Parameters<typeof String.prototype.indexOf>) {
    let Filter = 'win16|win32|win64|mac|macintel'
    if (Args[0] && typeof Args[0] === 'string' && (Args[0] as string).toLowerCase() === Filter) {
      return 1 
    }
    return Reflect.apply(Target, ThisArg, Args)
  }
})