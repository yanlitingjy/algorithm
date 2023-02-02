class Promise {
    constructor(fn) {
        // resolve 时的回调函数列表
        this.resolveTask = []
        // reject 时的回调函数列表
        this.rejectTask = []
        this.state = 'pending'
        let resolve = value =>{
            if(this.state == 'pending') return
            this.state = 'fulfilled'
            this.data = value
            setTimeout(()=>{
                this.resolveTask.forEach(cb=>cb(value))
            })
        }
        let reject = err => {
            if(this.state == 'pending') return
            this.state = 'rejected'
            this.error = err
            setTimeout(()=>{
                this.rejectTask.forEach(cb=>cb(err))
            })
        }
        try {
            fn(resolve,reject)
        }catch(error) {
            reject(error)
        }
    }
    then(resolveCallback,rejectCallback) {
        return new Promise((resolve,reject)=>{
            this.resolveTask.push(()=>{
                const res = resolveCallback(this.data)
                if(res instanceof Promise) {
                    res.then(resolve,reject)
                }else {
                    resolve(res)
                }
            })
            this.rejectTask.push(()=>{
                const res = rejectCallback(this.error)
                if(res instanceof Promise) {
                    res.then(resolve,reject)
                }else {
                    reject(res)
                }
            })
        })
    }
    static all(promises) {
        let result = []
        let index = 0
        return new Promise((resolve,reject)=>{
            for(let i=0;i<promises.length;i++) {
                Promise.resolve(promises[i]).then(res=>{
                    result[i] = res
                    index ++
                    if(promises.length === index) {
                        resolve(result)
                    }
                }).catch(err=>{
                    reject(err)
                })
            }
        })
    }
    static race(promises) {
        return new Promise((resolve,reject)=>{
            for(let i=0;i<promises.length;i++) {
                Promise.resolve(promises[i])
                .then(res=>{
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            }
        })
    }
}