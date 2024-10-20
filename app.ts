// ./ is called a relative import which means in the same directory
// import { add, sub } from "./util";
// defautl export can be imported with any name
import complexFunc from "./math/complex/util";
import simpleFunc from "./math/simple/util";
// if two namespaces have the same name you can import using an alias
// import {simple as complex} from "./math/complex/util";
import Anything, { add, sub } from "./util";

const result = add(1, 2);
console.log(result);

namespace Utils {
  export class MyClass {}
  export function myFunc() {}
  export const NAME = "jerome";
  export interface NewType {
    name: string;
  }
}

//const result2: Utils.NewType = Utils.myFunc();
