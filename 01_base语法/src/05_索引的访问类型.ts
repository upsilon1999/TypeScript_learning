//小知识：同名接口会合并
interface Product {
    name:string
    price:number
}

const symId = Symbol("hahah")
interface Product {
    //同名属性可以声明，但类型必须一致
    //实际上相当于不重复声明
    price:number
    buy():void
    [symId]:number | string
}


//通过接口设置索引访问类型
/**
 * ①
 * type 类型A = 接口[属性名的字面量类型]
 * 
 * 则类型A就是 对应属性的类型
 * 
 * ②
 * type 类型B = 接口[属性名1的字面量类型 | 属性名2的字面量类型]
 * 
 * 则类型B是对应多个属性的联合类型
 * 
 * ③
 * 不要误以为 [] 里面是字符串，实际上里面是字面量类型，例如
 * 
 */
type A = Product["name"]

type B = Product["name"|"price"]

//不使用symId的原因，symId是一个值，不是字面量类型
//typeof symId得到 [symId]对应的字面量类型
type C = Product[typeof symId]


/**
 * 需求：获取Product接口中所有属性名组成的类型
 * 方法:
 * keyof 接口名
 * 
 * 作用：
 * 得到所有属性的字面量类型的联合类型
 */

type Pkeys = keyof Product
//keyof Product等同于 "name"|"price"|"buy"|"typeof symId"

//扩展知识，目前了解即可
type AllKeys<T> = T extends any?T:never
// 迭代出来
type Pkeys2 = AllKeys<keyof Product>
export {}