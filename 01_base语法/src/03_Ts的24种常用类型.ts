/**********************基本数据类型****************************/
/**
 * 和js中的基本数据类型一样：
 * number string boolean symbol null undefined
 */
let a:number = 1
let a1:string = ""
let a2:boolean = true
/************************************************************/

/***********************根类型****************************/
/**
 * 根类型包括 Object和{}
 * 根类型可以理解为其他任意数据类型的父类
 * Object类型，除了null和undefied这种空类型外都可以赋值
 * {}和Object一样，他是Object的简写
 */
let b1:Object = [1,2,3,"ddd"]
let b2:number = 3
let b3:{} = "vvv"

/******************************************************/


/*******************对象类型*****************************/
/**
 * 对象类型
 * Array object function
 * 注意object是对象类型，Object是根类型，首字母大小写
 * Array是数组类型，使用需要指明值的类型 Array<类型>
 */
let c1:Array<number> = [1,2,3]
let c2:object = {
    name:"小明",
    age:18
}
/********************************************************/

/*********************联合类型****************************/
// 合成类型之联合类型
/**
 * 用多种数据类型联合起来，例如用时候我们需要一个值是数字或字符串
 * 格式：
 * 类型1 | 类型2 | 类型3
 * 
 * 理解：
 * 联合类型是 或 的关系
 * tips:我们给的是联合类型，但是做操作的时候编译器会根据情况给他相应类型
 */
let d1: number|string = 5
d1 = "aaa"
// 例如下面编译器就和得出d1是string类型
console.log("编译器会自动判断成相应类型",d1);

/********************************************************/

/******************交叉类型*******************************/
// 合成类型之交叉类型
/**
 * 交叉类型是 与 的关系
 * 格式：
 * 类型1 & 类型2 & 类型3
 * 
 * 值需要同时满足多个类型
 */

/**
 * 理解
 * {username:string}
 * 值是一个对象类型，里面有一个键 username
 * 并且username的类型是string
 */
let f1:{username:string} = {
    username:"abc"
}

/**
 * 定义类型
 * type 类型名A = 类型A
 * 
 * 使用：
 * let a:类型名A = 值
 * 就相当于
 * let a:类型A = 值
 */
type A1 = {name:string}
type A2 = {age:number}

// 这就是interface的实现逻辑
// 值需要同时满足多个类型
let f2:A1 & A2 ={
    name:"张三",
    age:14
}

/**
 * 交叉类型是有限制的，创造不被允许的类型是不允许的，例如
 * string & number
 * 这两个类型没有交集，就会变成never类型
 */
/********************************************************/

/*********************字面量类型******************************/
/**
 * 所谓字面量类型，就是值 的样子必须和类型一样
 * 可以理解为照镜子
 */
type num = 1 | 2 | 3
let n:num = 3
/**
 * 实际应用举例
 * 我们想要 输入1和0来代表true和false，其他数字不可以
 * 0 代表false ，1代表true是我们用业务来表明的
 */
type increase = 0 | 1
function isStart(increase:increase){
    if(increase == 0){
        console.log("还没开始");
    }else{
        console.log("开始了");
    }
}
// 调用函数，传入值只能是0或1，0代表false，1代表true
isStart(1)
/****************************************************************/


/***********************never类型*******************************/
/**
 * 面试题：never类型什么时候会被呈现
 * 补充：
 * 得到值的类型 
 * typeof 值  
 */
type Params = string | number
function getParams(p:Params){
    if(typeof p === "string"){
        console.log("这是字符串",p);   
    }else if(typeof p === "number"){
        console.log("这是数字",p);  
    }else{
        // 预留给其他可能存在的类型
        //他会给我们推断出data是never类型
        //和交叉类型一样，因为不可能存在
        let data = p
    }
}
/**************************************************************/

/***********************枚举类型***************************/
// if/switch的痛点：值和情况太多，语义化不明
/**
 * 下面采用的是常量解决的方式
 * 1.不直接用数字的原因：可读性低，即if/switch语义化不明
 * 2.所以外置常量，增加可读性
 * 3.存在问题，getAduitStatus传入的参数status的number类型设置的太宽泛
 * 
 * 常量解决带来的局限性:
 * 方法参数不能定义为具体类型，只能初级使用number,string基本类型替代，降低了代码的可读性和可维护性。
 */
const Status = {
    MANAGER_ADUIT_FAIL:-1,
    NO_ADUIT:0,
    MANAGER_ADUIT_SUCCESS:1,
    FINAL_ADUIT_SUCCESS:2
}
//审核类
class MyAduit {
    getAduitStatus(status:number):void{
        if(status === Status.NO_ADUIT){
            console.log("没有审核");
        }else if(status === Status.MANAGER_ADUIT_SUCCESS){
            console.log("审核通过");
        }else if(status === Status.MANAGER_ADUIT_FAIL){
            console.log("审核失败");
        }
    }
}

// 枚举的定义
/**
 * 用来存放一组固定的常量的序列
 * 语法：
 * enum 枚举的名字 {
 *     //枚举块，内容是一个个枚举项
 *     //枚举项的写法
 *      键 = 值
 * }
 * 
 * 要知道枚举项怎么写，的先了解枚举的分类
 * 
 * 枚举的底层就是一个对象，根据枚举类型的不同，映射类型也不同，
 * 例如数字类型的枚举，除了键映射外还有一个值映射，相当于双向映射
 * 
 * 所以用法也不一样
 * 枚举的名字.键  => 值
 * 枚举的名字["键"] => 值
 * 
 * //数字类型的枚举，多一个双向映射
 * 枚举的名字[数字值] => 键
 */


// 枚举的类型
/**
 *  字符串类型的枚举
 */
enum WeekEnd {
	Monday = "MyMonday",
	Tuesday = "MyTuesday",
	Wensday = "MyWensday",
	ThirsDay = "MyThirsDay"
}

//键 => 值
//和对象一样，单向映射
console.log(WeekEnd.Monday)
console.log(WeekEnd["Monday"])


/**
 * 数字类型的枚举
 * 数字枚举的值会自动计算，每次加1
 * 从最近的一个设定了值的那项开始计算，如果都没有就从0开始
 */
enum MyNum {
	Monday = 1,
	Tuesday,
	Wensday
}

//键 => 值
console.log(MyNum.Monday);
//值 => 键
console.log(MyNum[1]);

/**
 * 枚举带来的好处
 * 1.有默认值和可以自增加值，节省编码时间
 * 2.语义更清晰，可读性更强
 * 
 * 因为枚举类型是一种值类型的数据，方法参数可以明确参数类型为枚举类型
 */
// 改造上面的案例
enum StatusEnum {
    // 利用自增的特性
    MANAGER_ADUIT_FAIL =-1,
    NO_ADUIT,
    MANAGER_ADUIT_SUCCESS,
    FINAL_ADUIT_SUCCESS
}

function getEnumStatus(status:StatusEnum){
    // 枚举既是类型，又是一个变量
    if(status === StatusEnum.NO_ADUIT){
        console.log("没有审核");
    }else if(status ===StatusEnum.MANAGER_ADUIT_SUCCESS){
        console.log("审核通过");
    }else if(status === StatusEnum.MANAGER_ADUIT_FAIL){
        console.log("审核失败");
    }
}

// 这样我们使用的时候也使用枚举值，而不是数字，可读性就极强
getEnumStatus(StatusEnum.NO_ADUIT)
/******************************************************* */
export {}