// const test = {}
// Object.defineProperty(test,'test',{
//     value: 'test',
//     enumerable: true,
//     writable: true,
//     configurable: true // 可配置的，就是能用definproperty改变属性描述符
// })
// console.log("test:",test)



// 1.this指向问题
// 云从面试突然发现的问题，var let const 的区别在于，var是全局作用域，有变量提升，后两者是块级作用域，没有变量提升，不就这些嘛
// 一点补充，所谓的全局作用域，就是var声明的变量会挂载到window上，卧槽，这细节我特么怎么知道
// 关于this指向的问题，其实我们只需要知道两点，一个是this的四种绑定，另一个就是，this的指向取决于调用位置


// let alex = {
//     name: 'alex',
//     sayHello: function(age,tall) {
//         console.log('i am ' + this.name + ',this year i am ' + age + ' years old... and i am ' + tall + ' m')
//     },
//     test: function(){
//         console.log("this:",this)
//     },
//     test2: () => {
//         console.log("this:",this)
//     }
// }

// let bob = {
//     name: 'bob',
// }

// Function.prototype.myCall = function(...args) {
//     const target = args[0]
//     target._f = this
//     target._f(...args.slice(1))
//     delete target._f
// }

// Function.prototype.myApply = function(...args) {
//     const target = args[0]
//     target._f = this
//     target._f(...args[1])
//     delete target._f
// }

// Function.prototype.myBind = function(...args) {
//     const target = args[0]
//     target._f = this
//     return () => {
//         target._f(...args.slice(1))
//         delete target._f
//     }
// }



// alex.sayHello.myCall(bob,26,1.65)
// alex.sayHello.myApply(bob,[26,1.65])
// alex.sayHello.myBind(bob,26,1.65)()

// // 上述代码，堪称完美



// 习题轰炸
// 1). 默认绑定
    // function a(){
    //     const user = '剃了胡子';
    //     console.log(this.user); // undefined
    //     console.log(this); // window
    // } 9
    // a(); // 这里相当于 window.a();
    // this 最终指向的是调用它的对象，这里的函数a实际是被 window 对象所点出来的

    // const o = {
    //     a: 10,
    //     b: {
    //         a: 12,
    //         fn: function(){
    //             console.log(this.a); // undefined
    //             console.log(this); // window
    //         }
    //     }
    // }
    // const j = o.b.fn;
    // var a = 2
    // j();

// // 2). 隐式绑定
    // const a = {
    //     user: '剃了胡子',
    //     fn: function() {
    //         console.log(this);// {user: '剃了胡子', fn: ƒ}
    //     }                   
    // }

    // a.fn();//this 执行时被它的上一级对象 o{user: "剃了胡子", fn: ƒ} 调用

// 3). 当this遇到return，这里其实可以考察对new的理解
    // function fn(){
    //     this.user = '剃了胡子';
    //     return {};
    // }
    // const fn2 = function() {
    //     this.user = "nima"
    //     return {}
    // }

    // const a = new fn2();
    // console.log("a:",a.user);// undefined,因为return了一个空对象

    // function fn(){
    //     this.user = '剃了胡子';
    //     return 1
    // }
    // const a = new fn();
    // // 无语
    // console.log(a.user); // 剃了胡子，因为1是数字不是对象类型，防不胜防啊
    
    // function fn() { 
    //     this.user = '剃了胡子'; 
    //     return undefined; 
    // } 
    // const a = new fn; 
    // console.log(a.user); //剃了胡子

    // function fn() { 
    //     this.user = '剃了胡子'; 
    //     return null; 
    // } 
    // var a = new fn; 
    // console.log(a.user); //剃了胡子，null比较特殊


// 作用域相关--被一图科技搞死
    // 1)
    // // part1 考察function的变量提升高于var,相当于先执行了var，再执行function
    // // 此处还不能说function的变量提升高于var 而是var置顶，然后声明函数a
    // console.log(a); //f
    // function a() {
    //     console.log('shshahh')
    // };
    // console.log(a); //f
    // var a = 1;
    // console.log(a); //1

    // part2--这尼玛考察啥？---还是考察变量提升--不单单是变量提升的问题，发现var a = 1而后在function时，a还是1，原因在于并不是赋值
    // js说简单也简单，说傻逼也傻逼
    // var foo = 1;
    // console.log(foo); 
    // function foo() {
    //   console.log('1111')
    // };
    // console.log(foo); 

    // 2)
    // part1
    // var scope = "global scope";
    // function checkscope(){
    //     var scope = "local scope";
    //     function f(){
    //         return scope;
    //     }
    //     return f();
    // }
    // let res = checkscope()
    // console.log('res:',res)

    // part2 ---尼玛，原本能好好的回答的
    // var scope = "global scope";
    // function checkscope(){
    //     var scope = "local scope";
    //     function f(){
    //         return scope;
    //     }
    //     return f;
    // }
    // let res = checkscope()()
    // console.log('res:',res)

    // 3）：注意两件事，第一个，this指向调用他的对象作用域 第二个，尖头函数不改变，指向其外层环境
    // const name = 'window'
    // const obj1 = {
    //   name: 'obj1',
    //   foo: function () {
    //     this.name = 'nima'
    //     console.log(this.name)
    //     return () => {
    //       console.log(this.name)
    //     }
    //   }
    // }
    // var obj2 = {
    //   name: 'obj2',
    //   foo: () => {
    //     console.log(this.name)
    //     return function () {
    //       console.log(this.name)
    //     }
    //   }
    // }
    // obj1.foo()()
    // obj2.foo()()
    // var 声明的才是全局
    // var name = 'baba'
    // const test = {
    //     name: "hah",
    //     f: () => {
    //         console.log('this.name:',this.name)
    //     }
    // }
    // test.f()


//  ======================================================================

// 2.new 一个对象发生了啥,prototype指向原型对象
    // 1) 创建一个空对象
    // let Parent = function (name, age) {
    //     this.name = name;
    //     this.age = age;
    // };
    // Parent.prototype.sayName = function () {
    //     console.log(this.name);
    // };

    // let test = new Parent('alice',23)
    // const myNew = function(...args) {
    //     let child = Object.create(args[0].prototype)
    //     console.log('child1:', child)
    //     let res = args[0].call(child,...args.slice(1))
    //     console.log('child2:', child)
    //     console.log('typeof res ===:', typeof res )

    //     return typeof res === 'object'? res: child
    // }

    // let test2 = myNew(Parent,'alice',23)
    // console.log(test)
    // console.log(test2)

    // const Parent = function(name, age) {
    //   this.name = name
    //   this.age = age
    // }

    // const myNew = function(...args) {
    //   const target = args[0]
    //   const child = Object.create(target.prototype)
    //   let res = target.call(child, ...args.slice(1))
    //   return typeof res === 'object'? res: child
    // }

    // const child = new Parent('alice', 12)
    // const child2 = myNew(Parent, 'alice', 12)
    // console.log('child:', child)
    // console.log('child2:', child2)



    // 妈的越看越懵逼
    // 也就那么回事，关键是不熟悉


// 4.promise
    // 1).new promise时是同步执行回调函数，.then是异步的
    // const promise  = new Promise((resolve,reject) => {
    //     console.log(1)
    //     resolve()
    //     // reject()
    //     console.log(2)
    // })

    // promise
    // .then(() => {
    //     console.log('resolve')
    // })
    // .catch(() => {
    //     console.log('reject')
    // })
    // console.log(4)

    // 2).  抛出throw会执行catch方法
    // const promise = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve('success')
    //       console.log('sss')
    //     }, 1000)
    //   })
    // console.log(promise)
    // promise
    // .then(() => {
    //     console.log(promise)
    //     throw new Error('error!!!')
    // })
    // .catch(err => {
    //     console.log('err')
    // })    
    
    // 3).new promise时的回调函数只执行第一次的resolve或者reject
    // const promise = new Promise((resolve, reject) => {
    //     resolve('success1')
    //     reject('error')
    //     resolve('success2')
    //   })
      
    //   promise
    //     .then((res) => {
    //       console.log('then: ', res)
    //     })
    //     .catch((err) => {
    //       console.log('catch: ', err)
    //     })    


    // 4). 链式调用，.then.then.then.....
    // Promise.resolve(1)
    // .then((res) => {
    //   console.log(res)
    //   return 2
    // })
    // .catch((err) => {
    //   return 3
    // })
    // .then((res) => {
    //   console.log(res)
    // })

// 拓展:每秒钟发出一个ajax请求
// let c = 0
// const send = function(){
//     const m =setInterval(function() {
//         c++
//         console.log("hahah")
//         if(c>10) clearInterval(m)

//     },2000)
// }
// send()


// 5). return抛出错误并不会捕获catch还是走的then
    // Promise.resolve()
    // .then(() => {
    //   return new Error('error!!!')
    // })
    // .then((res) => {
    //   console.log('then: ', res)
    // })
    // .catch((err) => {
    //   console.log('catch: ', err)
    // })

    // 7).不能返回其本身，否则死循环

    // const promise = Promise.resolve()
    //     .then(() => {
    //         return promise
    //     })
    // promise.catch(console.error)    

    // 8). 这个就很诡异了，也没说打印res啊

    // Promise.resolve(1)
    // .then(2)
    // .then(Promise.resolve(3))
    // .then(console.log)


    // 9). 骚气的写法

    // Promise.resolve()
    // .then(function success (res) {
    //   throw new Error('error')
    // }, function fail1 (e) {
    //   console.error('fail1: ', e)
    // })
    // .catch(function fail2 (e) {
    //   console.error('fail2: ', e)
    // })

    // 10). 这题，很经典
    // process.nextTick(() => {
    //     console.log('nextTick')
    // })
    // Promise.resolve()
    // .then(() => {
    //     console.log('then')
    // })
    // setImmediate(() => {
    //     console.log('setImmediate')
    // })
    // console.log('end')

    // 11). 实现promise.all
    // const promise = new Promise()
    // .then(res => {
    //     console.log('success')
    // })
    // .catch(err => {
    //     console.log('err')
    // })




    // const promiseAll = function(arr) {
    //     return new Promise((resolve,reject) => {
    //         let len = 0
    //         let resolveArr = []
    //         arr.forEach(promise => {
    //             promise
    //             .then(res => {
    //                 resolveArr.push(res)
    //                 len++
    //                 if(len === arr.length) resolve(resolveArr)      
    //             })
    //             .catch(err => {
    //                 reject(err)
    //             })
    //         }) 
    //     })
    // }


    // const promiserace = function(arr) {
    //     return new Promise((resolve,reject) => {
    //         let n = 0
    //         arr.foreach(promise => {
    //             promise
    //               then(res => {
    //                   resolve(res)
    //               })
    //               .catch(err => {
    //                   n++
    //                   if(n === arr.length) reject(err)
    //               })
    //         })
            
    //     })
    // }


// 5. 宏任务和微任务
    // 1) 定时器是个典型的宏任务，promise是微任务
        // setTimeout(() => console.log(4))
        // new Promise(resolve => {
        //   resolve()
        //   console.log(1)
        // }).then(_ => {
        //   console.log(3)
        // })
        // console.log(2)

        // 2).就是说，并不是要等promise包含的语句快全部执行完毕才继续，依旧是循环---不知道说的啥。。。。
        // console.log(1)
        // setTimeout(() => {
        //     console.log(2);
        //     Promise.resolve().then(() => {
        //        console.log(3)
        //     });
        // }, 0);
        
        // new Promise((resolve) => {
        //     console.log(4);
        //     resolve();
        // })
        // .then(() => {
        //     console.log(5);
        //     setTimeout(() => console.log(6), 0)
        // });
        // console.log(7);

        // 3).惭愧啊，下面代码给了我如何每隔一秒发送一个请求的解决方案
        // const syncFunc = () => {
        //     const time = new Date().getTime();
        //     while(true) {
        //       if(new Date().getTime() - time > 2000) {
        //         break;
        //       }
        //     }
        //     console.log(2);
        //   }
        //   console.log(1);
        //   syncFunc();
        //   console.log(3);

        // 4).
        // console.log('outer');
        // setTimeout(() => {
        //   setTimeout(() => {
        //     console.log('setTimeout');
        //   }, 0);
        //   setImmediate(() => {
        //     console.log('setImmediate');
        //   });
        // }, 0);

        // console.log('outer');
        
// -------------------
        // setTimeout(() => {
        // console.log('setTimeout');
        // }, 0);

        // setImmediate(() => {
        // console.log('setImmediate');
        // });

        
          
          

// 6. 闭包--彻底理解
// function outer() {
//     var i = 1
//     return function() {
//         console.log(i++)
//     }
// }
// let getnum = outer()
// console.log(getnum)
// getnum()
// getnum()
// i = 1
// getnum()
// getnum()

// // 7.防抖截流

    // const debounce = function(fn,delay){
    //     var timer = null
    //     return function(){
    //         clearTimeout(timer)
    //         timer = setTimeout(fn,delay)
    //     }
    // }

//     const throttle = function(fn,delay) {
//         let timer = null
//         let flag = true
//         return (function(){
//             if(flag) {
//                 timer = setTimeout(function(){
//                     fn(),
//                     flag = true
//                 },delay)
//             }
//             flag = false
//         })()
//     }

//     private debounce = (fn: any,delay: any) => {
//         clearTimeout(this.timer)
//         this.timer = setTimeout(fn,delay)
//     }
  
  
//     private throttle = (fn: any, delay: any) => {
//       if(this.flag) {
//         this.flag = false
//         this.timer = setTimeout(() => {
//           fn()
//           this.flag = true
//         }, delay)
//       }
//     }



    // 8.sort的方法实现机制
    // let arr = [3,4,2,13,5,6,2]
    // arr.sort((a,b) => {
    //     return a-b
    // })
    // console.log(arr)

    // 9.map和reduce
    // let arr = [1,2,3,4]
    // let ne = arr.map(item => {
    //     return item + 1
    // })
    // console.log(ne)






// 11.函数柯里化及其通用封装
    // 我们知道reduce这个方法其实就是，可以将对数组做累计的操作
    // const arr = [1,2,3,4,5]
    // function add(...args) {
    //     return args.reduce((a,b) => a+b)
    // }
    // console.log(add(1)(2))

// ==========================================================================================


// 12.正则匹配相关 
    // const test = "07751770896"
    // var result = "hello".replace(/^|$/g, '#');

    // 匹配一个字符串是否有数字字母下划线组成
    // const regex = /^[0-9a-zA-Z_]{1,}$/g
    // const regex = /^[0-9a-zA-Z_]+$/g
    // 上述两者等价

    // 完全匹配
    // const regex = /_?/

    // 匹配一个字符串是否为合法的电话号码,得视情况而定
    // const regex = /^1[0-9]{11}/g

    // 匹配以某字符开头
    // const regex = /^1.*/g

    // 匹配一个字符串是否为合法的email
    // const regex = /^[/w-]+(/.[/w-]+)*@[/w-]+(/.[/w-]+)+$/g
    // console.log(regex.test(test))
    

// 13.定时器是按照时间长短依次塞入宏任务队列，并不是先进先出 

// console.log("start")
// setTimeout(() => {
//     console.log("set")
// },5000)
// // setTimeout(() => {
// //     console.log('set2')
// // },0)
// console.log("end")



// 14 类,继承，等等相关 

    

    // 2) es6之前实现类得方法
    // 3) js中继承的几种方式
    // 构造函数继承
    // const Parent = function(){
    //     this.children = ['son1', 'son2']
    // }

    // Parent.prototype.getChildren = function () {
    //   return this.children
    // }
    // const Children = function (...args) {
    //   Parent.call(this, ...args)
    // }
    // Children.prototype = new Parent()
    // const child = new Children()
    // const child2 = new Children()
    // console.log('child.__proto__', child.__proto__)
    // child.children.push('nima')
    // child2.children.push('nima2')
    // console.log('child.getName():', child.getChildren())
    // const child = new parent()
    // console.log(child.name)


    // ts与js的区别
    // 1.弱类型 ---> 强类型
    // 2.ts代码需编译成js再执行


    // 15.模块那些事儿
    // console.log(__dirname)
    // console.log(__filename)
    
    // // eval执行字符串,但有污染
    // const a = 2
    // eval('console.log(a)')
    



// 15.ajax
    // let xml = XMLHttpRequest()
    // xml.onreadystatechange = function() {
    //     if(xml.status == 200 && xml.readystate === 4) {
    //         var data = xml.responseText
    //     }
    // }

    // xml.open(method,url,true)
    // xml.send()


