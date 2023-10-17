let str:string
//只给了类型，没有赋值，不允许读取/打印
// console.log(str);

let str1:string|undefined
//允许其为undefined类型后就可以输出了
//输出值为undefined
console.log(str1);//undefined

/**
 * 配置项中有一个配置 
 * strict是旗下所有strictXX的总和
 * 如果strictXxx没有设置，就采用strict的设置
 * 
 * strictNullChecks
 * 值为 true，不允许将null和undefined赋值给其他类型
 * 值为 false，允许把 null和undefined赋值给其他类型
 * 
 * 我们采用默认的true，可以减少代码的问题
 */

/******************变量?:类型********************************* */
//#region 
/**
 * data?:string
 * ①相当于 data的类型是 string|undefined
 * ② data是个可选参数
 *
 * data?:string 不完全等于 data:string|undefined
 */
function fn(data?:string){

}

//当函数传参为空时，如果 data:string 就会报错
//即使设置 data:string|undefined 也需要传递参数，所以data?:string和data:string|undefined不完全一样
fn()


/*
  小结：
    变量?:类型A
  ①变量的类型为 类型A|undefined，即原类型和undefined的联合类型
  ②变量可选
*/
//#endregion
/****************************************************************** */

/*******************变量!.方法************************************ */
//#region 
function fn1(data?:string){
    //情况1
    // 由于data可能为undefined，所以会报错
    // data.toLowerCase()

    //2.强制截断
    /**
     * 变量!.方法
     * 
     * 如果变量为undefined、null就省略，或者说不执行
     */
    // data!.toLowerCase()

    //3.进行if判断
    //情况2是这个的简写
    if(data){
        data.toLowerCase()
    }

}
//#endregion
/*************************************************************** */

/*************************null和undefined****************************** */

// any，unknown，undefined可以接受undefined
let a:any = undefined
let a1:unknown = undefined
let a2:undefined = undefined

//any,unknown,null 可以接受null
let b:any = null
let b1:unknown = null
let b2:null =null
/**************************************************************** */

export {}