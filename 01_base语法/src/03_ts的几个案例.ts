//#region 案例1
    let obj = {username:"zhansan"}
    let a = "username" 

    /*
        由于a的值是可变的，所以他可能会被改变不等于 username
        ts预先判断到了这种错误，故予以禁止
    */
    //let u = obj[a]

    // 解决方案
    //使用不可变的常量
    const b = "username"
    let t = obj[b]
//#endregion


//#region 案例2
    let obj1:object = {age:18}

    /**
     * 以下这个情况也会报错，是索引类型的错误
     * 他会拿着 c代表的age这个键去和类型object对比
     * 发现object没有规定这个索引，故报错
     * 
     * 尽量避免这种
     */
    //const c = "age"
    //let k = obj1[c]
//#endregion