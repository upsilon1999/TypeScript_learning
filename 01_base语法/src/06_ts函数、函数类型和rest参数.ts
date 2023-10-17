//#region 基本语法
    /*
        function 函数名(参数1:类型,...):返回值类型{

        }

        ①参数个数确定时，调用时参数个数和类型都得一一对应
        ②返回值类型要与实际一致，如果不指明类型，会自动推导
    */
    function info(name:string,age:number):number{
        console.log("我好开心");
        return 3
    }
//#endregion

//#region 函数表达式写法
    /*
        就是从原来的格式中抽离了函数名
    */
    let info1 = function (name:string,age:number):number{
        console.log("我好开心");
        return 3
    }
//#endregion

//#region 显式给出函数类型
    /*
        函数类型的写法

        (参数:类型,...)=>返回值类型
    */
    let info2:(name:string,age:number)=>number = function  (name:string,age:number):number{
        console.log("我好开心");
        return 3
    }

    //限定了函数类型后，函数就必须符合类型，同时也可以进行相应简写
    let info3:(name:string,age:number)=>number = 
    function  (name,age){
        //简写，参数类型和返回值类型不用再显式指出
        console.log("我好开心");
        return 3
    }
//#endregion

//#region 函数类型抽离
    //函数类型很长，写在变量后可读性太差，可以用type在外部定义

    type InfoFn = (name:string,age:number)=>number

    let info4:InfoFn = function  (name,age){
        console.log("我好开心");
        return 3
    }

//#endregion

//#region rest参数
    //所谓rest参数就是扩展参数，用于参数不确定的情况
    //和javascript中的arguments一样
    /*
        rest参数的类型必须是数组，原因是他本身会被拓展运算符展开
        ...rest:string[] 新参数都是字符串类型
        ...rest:any      新参数类型任意
    */
    
    function info5(name:string,age:number,...rest:string[]){
        console.log("rest",rest);
    }
//#endregion