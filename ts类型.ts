// // TS 类型实现

// // Pick: 从 T 中选取 K 指定的属性
// type MyPick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }

// // Omit: 从 T 中排除 K 指定的属性
// type MyOmit<T, K extends keyof T> = {
//   [P in Exclude<keyof T, K>]: T[P]
// }

// // Exclude: 从 T 中排除可以赋值给 U 的类型
// type MyExclude<T, U> = T extends U ? never : T

// // Readonly：把类型 T 里的所有属性都变成只读
// type MyReadOnly<T> = {
//   readonly [P in keyof T]: T[P]
// }

// // Partial：把类型 T 里的所有属性都变成可选
// type MyPartial<T> = {
//   [P in keyof T]?: T[P]
// }

// // 使用示例
// interface User {
//   id: number
//   name: string
//   email: string
//   password: string
// }

// type UserBasic = MyPick<User, 'id' | 'name'>  // { id: number, name: string }
// type UserPublic = MyOmit<User, 'password'>    // { id: number, name: string, email: string }

// /**
//  * Required：把类型 T 里的所有可选属性变成必选
//  */
// type MyRequired<T> = {
//   [P in keyof T]-?: T[P]
// }

// /**
//  * Record：构造键为 K、值为 T 的对象类型
//  */
// type MyRecord<K extends keyof any, T> = {
//   [P in K]: T
// }

// /**
//  * ReturnType：提取函数 T 的返回值类型
//  */
// type MyReturnType<T extends (...args: any) => any> =
//   T extends (...args: any) => infer R ? R : never

// /**
//  * Parameters：提取函数 T 的参数类型元组
//  */
// type MyParameters<T extends (...args: any) => any> =
//   T extends (...args: infer P) => any ? P : never

// /**
//  * NonNullable：从 T 中排除 null 和 undefined
//  */
// type MyNonNullable<T> = T extends null | undefined ? never : T

// /**
//  * Awaited：递归解包 Promise 类型
//  */
// type MyAwaited<T> =
//   T extends null | undefined ? T :
//   T extends object & { then(onfulfilled: infer F, ...args: infer _): any }
//     ? F extends (value: infer V, ...args: infer _) => any
//       ? MyAwaited<V>
//       : never
//     : T

// /**
//  * DeepReadonly：递归将所有属性变为只读
//  */
// type MyDeepReadonly<T> = {
//   readonly [P in keyof T]: T[P] extends object
//     ? T[P] extends Function
//       ? T[P]
//       : MyDeepReadonly<T[P]>
//     : T[P]
// }

// /**
//  * Get：根据路径字符串获取嵌套属性类型
//  */
// type MyGet<T, K extends string> =
//   K extends `${infer First}.${infer Rest}`
//     ? First extends keyof T
//       ? MyGet<T[First], Rest>
//       : never
//     : K extends keyof T
//       ? T[K]
//       : never

// /**
//  * TupleToUnion：元组转联合类型
//  */
// type MyTupleToUnion<T extends readonly any[]> = T[number]

// /**
//  * Flatten：扁平化嵌套数组类型
//  */
// type MyFlatten<T extends any[]> =
//   T extends [infer First, ...infer Rest]
//     ? First extends any[]
//       ? [...MyFlatten<First>, ...MyFlatten<Rest>]
//       : [First, ...MyFlatten<Rest>]
//     : []

// /**
//  * Mutable：移除所有属性的 readonly 修饰符
//  */
// type MyMutable<T> = {
//   -readonly [P in keyof T]: T[P]
// }

// /**
//  * IsEqual：判断两个类型是否完全相等
//  */
// type MyIsEqual<A, B> =
//   (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
//     ? true
//     : false

// // 使用示例
// type PartialUser = Partial<User>
// type RequiredUser = MyRequired<PartialUser>  // 等同于 User

// type StatusMap = MyRecord<'pending' | 'done', boolean>
// // { pending: boolean, done: boolean }

// function fetchUser(id: number): Promise<User> { return {} as any }
// type FetchResult = MyReturnType<typeof fetchUser>   // Promise<User>
// type FetchParams = MyParameters<typeof fetchUser>   // [id: number]

// type MaybeName = string | null | undefined
// type SafeName = MyNonNullable<MaybeName>            // string

// type Unwrapped = MyAwaited<Promise<Promise<string>>> // string

// interface Nested {
//   a: { b: { c: number } }
// }
// type DeepNested = MyDeepReadonly<Nested>
// type CType = MyGet<Nested, 'a.b.c'>                 // number

// type Colors = MyTupleToUnion<['red', 'green', 'blue']> // 'red' | 'green' | 'blue'

// type Flat = MyFlatten<[1, [2, 3], [4, [5]]]>        // [1, 2, 3, 4, 5]

// type ReadonlyUser = MyReadOnly<User>
// type MutableUser = MyMutable<ReadonlyUser>          // 等同于 User

// type Equal1 = MyIsEqual<string, string>             // true
// type Equal2 = MyIsEqual<string, number>             // false
