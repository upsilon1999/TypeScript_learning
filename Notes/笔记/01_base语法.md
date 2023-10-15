
## 基础概念和环境搭建

### 定义

融合了面向对象思想的javaScript超集。

### 环境搭建

```sh
#包环境
npm init -y
# 安装typescript
npm install typescript -D
# 生成typescript配置文件
tsc --init
```

#### 无法识别tsc

![[Snipaste_2023-10-12_23-02-42.png]]

>出现问题的原因

```sh
这个问题的原因是： 
由于typescript 是局部安装的，所以在控制台或者终端肯定是无法使用的，控制台或者终端能使用的是我们电脑本地安装的命令或者是环境变量里面有的配置，例如:npm npx 等
```

>解决方案

* 全局安装typescript

  ```sh
  npm install typescript -g
  
  #优点
  使用方便
  
  #缺点
  可能会污染全局的变量，不会实时更新typescript 这个库， 毕竟安装好了一般都是不管的。
  ```

* 使用node提供的npx

  ```sh
  npx tsc --init
  
  # 缺点
  运行tsc需要借助npx指令，需要预装node
  
  # 优点
  环境干净
  ```

## 基础知识

### 类型注解与类型推导

```ts
//类型注解
/**
 * 当我们在变量声明时就指明了类型，形如
 * 
 * let 变量名:变量类型
 * 
 * 就称之为类型注解，在赋值的时候就得遵循指明的类型
 */
let age:number =  18


//类型推导
/**
 * 我们声明变量时没有指定类型，但是赋了值，形如
 * 
 * let 变量名 = 变量值
 * 
 * 变量将根据变量值推导出类型
 */
let city = "罗马"

/**
 * 类型注解与类型推导的区别
 * ①类型注解时有默认值的
 * ②类型注解在变量定义时就进行了类型校验，而类型推导可以给任意值
 */
```

### Ts编译与编译优化
#### Ts编译问题

>局部文件设置

```ts
// 由于ts文件默认全局检测，所以不能用之前在别的文件中声明过的
let age:number = 18
//可以设置局部文件，加上下面一行即可
export {}
```

>编译问题

1.node不识别

```sh
node xxx.ts
#不被node识别
```

2.浏览器不认识ts语法
![[浏览器不认识.png]]

>无法识别的解决方案

ts代码要正常运行，就得转换编译成正常的js代码。
使用`tsc`命令，把ts文件转换成可执行的js文件，例如
```sh
# 把ts文件转换成js文件
#默认生成在同目录，可以在ts配置文件中调整
tsc my.ts

# 编译js文件即可，例如
node my.js
```
>编译踩坑之完整路径

背景：我的tsc是局部安装的，所以需要以npx前缀启动，结果报以下错误
![[局部tsc采用完整路径.png]]
解决方案：
tsc指令后跟随需要编译文件的完整路径
#### 编译配置
>输出目录的配置

在`tsconfig.json`中，找到`outDir`和`rootDir`,默认是注释掉的
```json
{
	"compilerOptions":{
		"rootDir":"./src",
		"outDir":"./dist"
	}
}
```
1.`rootDir`配置的是ts文件的目录，如上的配置将把所有`./src`目录下的ts文件，编译后都输出到我们配置的`outDir`目录下。还有个`rootDirs`目录，值是一个数组，不过我们此次用`rootDir`目录。
2.`outDir`指定编译的js文件的生成目录。
3.`./`代表工程根目录








### 常用的24中Ts类型
>概述

```sh
"基本类型"
number string boolean symbol null undefined

"根类型"
Object  {}

"对象类型"
Array  object function

"枚举"
enum

"其他特殊类型"
any unkonown never void 元组(tuple) 可变元组

"合成类型"
联合类型 交叉类型

"字面量数据类型"
```
#### 根类型

```ts
//根类型

/**

 * 根类型包括 Object和{}

 * 根类型可以理解为其他任意数据类型的父类

 * Object类型，除了null和undefied这种空类型外都可以赋值

 * {}和Object一样，他是Object的简写

 */

let b1:Object = [1,2,3,"ddd"]

let b2:number = 3

let b3:{} = "vvv"
```
#### 对象类型

```typescript
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
```
#### 枚举类型
##### 枚举出现的背景

解决多次if/switch判断中的语义化的问题
>以前的解决方式常量解决

```typescript
// if/switch的痛点：值和情况太多

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
```
>常量解决存在的局限性

方法参数不能定义为具体类型，只能初级使用number,string基本类型替代，降低了代码的可读性和可维护性。

##### 枚举的定义
定义：用来存放一组固定的常量的序列
>语法

```typescript
enum 枚举的名字{
	//枚举块，内容是一个个枚举项
	//枚举项的写法
	键 = 值
}
```
枚举的底层就是一个对象，根据枚举类型的不同，映射类型也不同，
例如数字类型的枚举，除了键映射外还有一个值映射，相当于双向映射
>使用

```typescript
枚举的名字.键  => 值
枚举的名字["键"] => 值

//数字类型的枚举，多一个双向映射
枚举的名字[数字值] => 键
```

##### 枚举的分类
>字符串枚举

```typescript
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
```
>数字枚举

```typescript
enum MyNum {
	Monday = 1,
	Tuesday,
	Wensday
}

//数字枚举的值会自动计算，每次加1
//从最近的一个设定了值的那项开始计算，如果都没有就从0开始

//双重映射
//键 => 值
//键 => 值
console.log(MyNum.Monday);

//值 => 键
console.log(MyNum[1]);
```
##### 枚举底层的样子
将ts文件编译成js文件就可以查看
>字符串类型的枚举

```typescript
//ts源文件
enum WeekEnd {
	Monday = "MyMonday",
	Tuesday = "MyTuesday",
	Wensday = "MyWensday",
	ThirsDay = "MyThirsDay"
}
```

```javascript
//编译后的底层
var WeekEnd;

(function (WeekEnd) {

    WeekEnd["Monday"] = "MyMonday";

    WeekEnd["Tuesday"] = "MyTuesday";

    WeekEnd["Wensday"] = "MyWensday";

    WeekEnd["ThirsDay"] = "MyThirsDay";

})(WeekEnd || (WeekEnd = {}));
```

>数字类型的枚举

```typescript
//ts源文件
enum MyNum {
	Monday = 1,
	Tuesday,
	Wensday
}
```

```javascript
//编译后的底层
var MyNum;

(function (MyNum) {

    MyNum[MyNum["Monday"] = 1] = "Monday";

    MyNum[MyNum["Tuesday"] = 2] = "Tuesday";

    MyNum[MyNum["Wensday"] = 3] = "Wensday";

})(MyNum || (MyNum = {}));
```
##### 枚举的好处
 * 1.有默认值和可以自增加值，节省编码时间
 * 2.语义更清晰，可读性更强
 因为枚举类型是一种值类型的数据，方法参数可以明确参数类型为枚举类型
```typescript
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
```

#### 合成类型之联合类型

联合类型是`或`的关系，在实际使用时，编译器会根据上下文得出他的实际类型
>格式

```sh
类型1 | 类型2 | ...
```
>小结
```typescript
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
```
#### 合成类型之交叉类型
交叉类型是`与`的关系，表示值需要同时满足这些类型
>格式

```sh
类型1 & 类型 2 & ...
```
对于无法产生交集的类型的组合，会得到never类型
>小结

```typescript
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

```
#### 字面量类型
可以理解为镜子类型，就是值需要与类型长得一样
>小结

```typescript
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
```
#### 其他类型
##### never
使用never避免出现未来扩展新的类没有对应的实现，目的是写出安全的代码
我们目前可以知道，当交叉类型没有交集时，就是never类型.
>面试题：never在什么情况下会被呈现

在逻辑不存在时会出现
>小结

```typescript
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
```
