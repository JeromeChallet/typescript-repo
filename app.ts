///////////////////////PRIMITIVE TYPES///////////////////////
// they are basic data types that represent a single value
// number, string, boolean, bigint, symbol, null, undefined
/* null is used when we do not expect the value to be defined (TS will never check its type)
whereas undefined is used when to declare a var which we do not know the type yet*/

// types are implicitly defined
let x = 2; // let x: number = 2;

// unassigned var can also be explicitly defined
let y: number;
y = 2;

///////////////////////ARRAYS///////////////////////
/* in TS you can store any type you want in the same array
however TS does not know when each value will be what inside of it*/
var arr = [1, 2, 3, "hello"];
// arr[0] + 1; // error

var arr2: number[] = [1, 2, 3];
var arr3: string[] = ["one", "two"];

// nested array
var arr4: string[][] = [["one"], ["two"], [""]];
var arr5 = [["one"], ["two"], 1];
// arr5[0].length; //error again cause TS does not know which type for each item

///////////////////////TUPLES///////////////////////
/* fixed length array that has defined values for each position in it
 it's defining what are the types of each item in the array
 they are usefull for defining coordinates
 it differs from an array that TS knows what type is for each item*/

const coord: [number, number] = [1, 2];
const coord2: [number, string] = [1, "two"];
console.log(coord2[0]); // understands it's a number
console.log(coord2[1]); // understands it's a string

const coord3: [number, number[]][] = [
  [1, [1, 2]],
  [-1, [3, 4]],
];
coord3[0][1]; // knowns its an array of number

///////////////////////LITERALS///////////////////////
/* literals are instances of a primitive type (23) ("hello") (bolean)
 they are precise values to be assgined to a var
 TS knows remembers what are those values to autofill*/

let direction: "north" | "south" | "east" | "west";
// direction = 'hello' // error

let responseCode: 200 | 404 | 201;
//responseCode = 2 // error

let responseCode2: true;
// responseCode2: false; // error

///////////////////////ENUMS///////////////////////
/* compared to an array, the advantage is we understand better what value to expect
 like for Size, it makes sense to expect small medium or large 
 it also makes autocomplete easier and refactor as well*/

enum Size {
  Small,
  Medium,
  Large,
}

Size.Small; // valueName.memberName

// we can access the members with numbers
var size: Size = 0; // = Small

enum Direction {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

enum Description {
  SmallText = "this is some text",
}

console.log(Description.SmallText); // "this is some text"

///////////////////////ANY///////////////////////
/* any means ignoring type checking for the var */
let z: any = 1;
z.length; // won't return an error although it should, but will on compile

///////////////////////UNKOWN///////////////////////
/* it will ignore the type checking like the any at fisrt but will do it 
when performing operation on it, much safer than any */
let s: unknown = 1;
// s.length; // error
// it should work but error cause we have not defined its type for performing the operation
// s + 1;
// this will work cause we explicitly tell what s is
if (typeof s == "number") {
  console.log(s + 1);
} else if (typeof s == "string") {
  console.log(s.length);
}

///////////////////////TYPE CAST///////////////////////
/* you cast a type to a var, you tell the compiler what it should be treated as
but you have to make sure to use an appropriate type, best to use an if else first*/

let q: unknown = 1;
const result = (q as number) + 1;
// const result = (q as number[][])[0][1] // runtime error for wrong type

///////////////////////OPTIONAL CHAINING///////////////////////
/* ? & ! operators allow us to deal with undefined values */
const arr6 = [{ name: "jerome" }, { name: "joe" }, { name: "jane" }];

/* will check if it is undefined, and if not check the next type, here string
 error without ? cause if it removes the very last element of the array then it would be undefined */
const el = arr6.pop()?.name;

const arr7 = [[{ name: "jerome" }]];
const el2 = arr7.pop()?.pop()?.name;

///////////////////////BANG///////////////////////
/* ! will force the type that is not undefined, here string, 
it's like saying to TS assume this is not undefined, this could be a problem
cause if we don't have defined value, it would still try to define it as a tring thus crash
the bang is usefull for forcing a specific type*/
const arr8 = [[{ name: "jerome" }]];
const el3 = arr8.pop()!.pop()!.name;

///////////////////////BASIC FUNCTION TYPES///////////////////////
/* functions also have implicit return values */
// function add(x: number, y: number) : number | "invalid"
function add(x: number, y: number) {
  if (x == 0) {
    return "invalid";
  }
  return x + y;
}

// ? makes the parameter optinal meaning it can be a string or undefined
// if the paramater has a default value then it becomes optional middleName:string="middle"
function makeName(firstName: string, lastName: string, middleName?: string) {
  if (middleName) return firstName + " " + middleName + " " + lastName;
  return firstName + " " + lastName;
}

const fullName = makeName("jerome", "challet");

// to invoke a function as a parameter we define its type including its parameters
function callFunc(
  func: (f: string, l: string, m?: string) => string,
  param1: string,
  param2: string
) {
  func(param1, param2);
}

callFunc(makeName, "jerome", "challet");

function mul(x: number, y: number): number {
  return x + y;
}

function div(x: number, y: number): number {
  return x / y;
}

// to pass in 2 functions or more you put them in funcs:()[]
function applyFunc(
  funcs: ((a: number, b: number) => number)[],
  values: [number, number][]
): number[] {
  const results = [] as number[];
  for (let i = 0; i < funcs.length; i++) {
    const args = values[i];
    const result = funcs[i](args[0], args[1]);
    results.push(result);
  }
  return results;
}

applyFunc(
  [mul, div],
  [
    [1, 2],
    [2, 5],
  ]
);

///////////////////////ADVANCED FUNCTION TYPES///////////////////////
// the rest parameter means you can take as many arguments as you want
function sum(str: string, ...numbers: number[]) {}

sum("hello", 1, 2, 3);
sum("");
sum("", 1, 2, 3, 1, 2, 3);

/* an overloaded function has different call signature and can accept different types
they are usefull for using the same function under different circumstances*/
// first we define all the valid ways we can call the function
function getItemLength(name: string): number;
function getItemLength(names: string[]): string;
// second we define a general function which can handle all the different type of inputs above
function getItemLength(nameOrNames: unknown): unknown {
  if (typeof nameOrNames === "string") {
    return nameOrNames.length;
  } else if (Array.isArray(nameOrNames)) {
    return "array returned";
  }
  return 0;
}
// now when we call the function, TS will detect the correct overload (type to use)
getItemLength(["", ""]);
getItemLength("");

///////////////////////INTERFACES///////////////////////
/* they enforce certain properties on objects it allows us to view any object as 
a specific type. We define in it any properties that object of its type needs to declare*/
interface Person {
  name: string;
  age: number;
  height?: number;
  hello?: () => void;
}

const person: Person = {
  name: "jerome",
  age: 38,
  hello: function () {
    console.log(this.name + " says hi");
  },
};

// we make the method optional by using ?.
// because TS expects the method to be potentially undefined you use ?.
person.hello?.(); // jerome says hi

// extending an interface is to inherit all the properties of the original one
interface Employee extends Person {
  employeeId: number;
}

const worker: Employee = {
  name: "jerome",
  age: 38,
  height: 170,
  employeeId: 10,
};

// we can extend from several interfaces
interface Manager extends Employee, Person {
  employees: Person[];
}

const manager: Manager = {
  name: "jerome",
  age: 38,
  height: 170,
  employeeId: 10,
  employees: [],
};

// it can also be used for functions
// we pretty much defines the arguments in the interface
function getPerson(p: Person): Person {
  return {
    name: "jerome",
    age: 23,
  };
}

///////////////////////PRIVATE CLASSES///////////////////////
/* public & private & protected are known as access modifier, privat means the property
can only be accessed within its class preventing the internal state to be changed
it is good practice to use the strictess modifier possible: public > protected > private*/
class Person1 {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet(): void {
    console.log(`my name is ${this.name}`);
  }
  // to access that private parameter we can use a getter or setter method
  getName(): string {
    if (this.name.length < 2) return "";
    return this.name;
  }
  setName(name: string): void {
    if (name.length < 5) return;
    this.name = name;
  }
}

const p1 = new Person1("jerome");
console.log(p1.getName()); // works thanks to the getter getName
//p1.name = "sam"; // error because of private

///////////////////////PUBLIC CLASSES///////////////////////
class Person2 {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet(): void {
    console.log(`my name is ${this.name}`);
  }
}

const p2 = new Person("jerome");
p2.name = "sam"; // works ok thanks to public

///////////////////////PROTECTED CLASSES///////////////////////
/* we can access the property from its own class or an inherited class*/
class Person3 {
  protected name: string;
  constructor(name: string) {
    this.name = name;
    this.greet();
  }
  private greet(): void {
    console.log(`my name is ${this.name}`);
  }
}

class Employee2 extends Person3 {
  callMe() {
    console.log();
    this.name;
  }
}

const p3 = new Person3("jerome");
//p3.name = "sam"; //  error because of protected

///////////////////////ABSTRACT CLASSES///////////////////////
/* not meant to be instanceciated but meant to be used as a based class 
for some behavior of sub classes */
abstract class Animal {
  // any class that inherits from the abstract class must implement this method
  abstract makeSound(duration: number): void;
  move() {
    console.log("moving along...");
  }
}

//const animal = new Animal() // error cause Animal is abstract

///////////////////////CLASSES & INTERFACES///////////////////////

///////////////////////STATIC ATTRIBUTES & METHODS///////////////////////

///////////////////////GENERICS///////////////////////

///////////////////////TYPE ALIASES///////////////////////

///////////////////////UNION & INTERSECTION///////////////////////

///////////////////////TYPE GUARDS///////////////////////

///////////////////////DISCRIMINATED UNIONS///////////////////////

///////////////////////UTILITY TYPES///////////////////////

///////////////////////MODULES///////////////////////

///////////////////////NAMESPACES///////////////////////
