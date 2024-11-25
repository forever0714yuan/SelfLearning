// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
const tupleNumber = [1, 2, 3, 4] as const;
const tupleMix = [1, "2", 3, "4"] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: "tesla";
        "model 3": "model 3";
        "model X": "model X";
        "model Y": "model Y";
      }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<
    Equal<TupleToObject<typeof tupleMix>, { 1: 1; "2": "2"; 3: 3; "4": "4" }>
  >
];

type error = TupleToObject<[[1, 2], {}]>;

// ============= Your Code Here =============
// keyof: 取interface的键后保存为联合类型
// in: 取联合类型的值，主要用于数组和对象的构建
type TupleToObject<T extends readonly any[]> = {
  [p in T[number]]: p;
};
