const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class myPromise {
    constructor(executor){
        try {
            executor(this.resolve,this.reject)
        }catch(e) {
            this.reject(e)
        }
    }
    status = PENDING
    value = undefined
    reason = undefined
    successCallBack = []
    failCallBack = []
    resolve(value) {
        if(this.status !== PENDING) return;
        this.status = FULFILLED
        this.value = value
        while(this.successCallBack.length){
            this.successCallBack.shift()()
        }
    }
    reject(reason) {
        if(this.status !== PENDING) return;
        this.status = REJECTED
        this.reason = reason
        while(this.failCallBack.length){
            this.failCallBack.shift()()
        }
    }
    then(successCallBack, failCallBack){
        successCallBack = successCallBack ? successCallBack : value=>value
        failCallBack = failCallBack ? failCallBack : reason => {
            throw reason
        }
        let promise  = new myPromise((resolve,reject) => {
            if(this.status === FULFILLED){
                setTimeout(()=>{
                    try {
                        let x = successCallBack(this.value)
                        resolvePromise(promise,x,resolve,reject)
                    }catch(e) {
                        reject(e)
                    }
                },0)
            } else if (this.status === REJECTED){
                setTimeout(()=>{
                    try {
                        let x = failCallBack(this.reason)
                        resolvePromise(promise,x,resolve,reject)
                    }catch(e) {
                        reject(e)
                    }
                },0)
            }else{
                this.successCallBack.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = successCallBack(this.value)
                            resolvePromise(promise,x,resolve,reject)
                        }catch(e) {
                            reject(e)
                        }
                    },0)
                })

                this.failCallBack.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = failCallBack(this.value)
                            resolvePromise(promise,x,resolve,reject)
                        }catch(e) {
                            reject(e)
                        }
                    },0)
                })
            }
        })
        return promise;
    }
    finally(callback){
        return this.then(value=>{
            return myPromise.resolve(callback()).then(()=>value)
        },reason=>{
            return myPromise.reject(callback()).then(()=>{
                throw reason
            })
        })
    }
    catch(failCallBack) {
        return this.then(undefined,failCallBack)
    }
    static all(array) {
        let result = []
        let index = 0
        return new myPromise((resolve,reject)=>{
            function addData(key,value){
                result[key] = value
                index++;
                if(index === array.length){
                    resolve(result)
                }
            }
            for(let i=0;i<array.length;i++){
                let current = array[i]
                if(current instanceof myPromise){
                    current.then(value => addData(i,value),reason=> reject(reason))
                }else{
                    addData(i,array[i])
                }
            }
        })
    }
    static race(array) {
        let promise = new myPromise((resolve,reject)=>{
            for(let i=0;i<array.length;i++){
                let current = array[i]
                if(current instanceof myPromise){
                    current.then(resolve,reject)
                }else{
                    resolve(current)
                }
            }
        })
        return promise
    }
    static resolve(value) {
        if(value instanceof myPromise) return value
        return new myPromise(resolve=>resolve(value))
    }
}


function resolvePromise(promise,x,resolve,reject){
    if(promise === x){
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(x instanceof myPromise){
        x.then(resolve,reject)
    }else{
        resolve(x)
    }
}