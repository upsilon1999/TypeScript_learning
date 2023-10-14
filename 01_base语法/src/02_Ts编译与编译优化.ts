// 由于ts文件默认全局检测，所以不能用之前在别的文件中声明过的
let age:number = 18
console.log("我今年的岁数",age);

// ts文件无法被node和浏览器直接识别，需要向转换成正常的js文件
/*
    ts文件转换成js文件需要借助tsc指令，例如
    tsc xx.ts
    文件默认生成在ts文件同目录下，可以在tsconfig.json中进行配置

*/ 

//可以设置局部文件，加上下面一行即可
export {}
