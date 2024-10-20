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

const p2 = new Person2("jerome");
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
  move(duration: number) {
    console.log("moving along...");
    this.makeSound(duration);
  }
}

//const animal = new Animal() // error cause Animal is abstract

class Dog extends Animal {
  // the method call must have the same call signature as the abstract method of its abstract class
  makeSound(duration: number): void {
    console.log("woof woof");
  }
}

class Cat extends Animal {
  // the method call must have the same call signature as the abstract method of its abstract class
  makeSound(duration: number): void {
    console.log("meow meow");
  }
}

const dog = new Dog();
dog.move(10);

///////////////////////CLASSES & INTERFACES///////////////////////
/* classes is a blueprint to create objects and they can extend other classes for inheriting functionalities,
intefaces can also be used on classes, they allow us to view a class through the lens of the interface
You use an interface when there's no concretely defined functionalities while an abstract class does
they allow us to trest different objects as if they were the same type*/

interface Animal2 {
  speak(): void;
}

class Dog2 implements Animal2 {
  private name: string;
  private color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
  // the method must be public
  speak() {
    console.log(`I am ${this.name} and i am ${this.color}`);
  }
  // extra methods can be optional
  test() {
    return 1;
  }
}

const dog2: Animal2 = new Dog2("jin", "brown");
//dog.test() //  error cause dog2 is being viewed through the lens of Animal2

class Cat2 implements Animal2 {
  speak() {
    console.log("meow");
  }
}

const dog3 = new Dog2("medock", "brown");
const cat = new Cat2();
/* because both cat and dog implement the same Animal interface 
we can view/treat them as if they were the same type Animal*/
const animals: Animal2[] = [cat, dog3];
animals[0].speak; // now i can only use the methods defined in Animal Interface

// same as function makeSound(animal: Cat2 | Dog2 )
function makeSound(animal: Animal2) {
  animal.speak();
}

makeSound(cat);

///////////////////////STATIC ATTRIBUTES & METHODS///////////////////////
/* they are var and methods that are associated with the class rather than the instances ofthe class
usefull to deifne shared values all the instances of the class will have */
class Dog3 {
  // because of static, instanceCount is associated with the class itself
  static instanceCount: number = 0;
  // name is an intance attribute, meaning each object has different name
  name: string;

  constructor(name: string) {
    // will track the number of instances of the Dog3 class
    Dog3.instanceCount++;
    this.name = name;
  }

  // we can also have static methods that can only access var that are assiociated with its class
  static decreaseCount() {
    // same as Dog3.instanceCount--;
    this.instanceCount--;
  }
}
const dog4 = new Dog3("jin");
console.log(Dog3.instanceCount); // 1
const dog5 = new Dog3("medock");
console.log(Dog3.instanceCount); // 2
Dog3.decreaseCount();
console.log(Dog3.instanceCount); // 1

///////////////////////GENERICS///////////////////////
/* allows to use a different type in classes based on the instance of the class,
we use them by declaring a type <T>, with that we can use a class with any data type passed to it */
class DataStore<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  getItem(index: number): T {
    return this.items[index];
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  getAllItems(): T[] {
    return this.items;
  }
}

interface User {
  name: string;
  id: number;
}

const data = new DataStore<string>();
// we can use more than primitive types
const data2 = new DataStore<User>();

function getValue<K, V>(key: K, value1: V, value2: V): V {
  if (key) {
    return value1;
  }
  return value2;
}

// we dont need to explicitly define the types cause TS figure them out from the arguments
const n1: number = 1;
const n2: number = 2;
getValue<string, number>("hello", n1, n2);

///////////////////////TYPE ALIASES///////////////////////
/* allows to create custom types, we use to define something that isn't necessarily an object */
type Coordinate = [number, number];

function compareCoords(p1: Coordinate, p2: Coordinate): Coordinate {
  return [p1[0], p2[1]];
}

// it can be easier to understand
// same as const corrds: [number, number][] = [];
const corrds: Coordinate[] = [];

// you cannot implement type aliases to classes
// class Dog implements Coordinate{} // error

///////////////////////UNION///////////////////////
/* Unions allows to combine type aliases to create more complex types */
type StringOrNumber = string | number | boolean;

function acceptVal(val: StringOrNumber) {}

///////////////////////INTERSECTION///////////////////////
/* instead of making another interface that extend several interfaces we use an intersection */

interface BusinessPartner {
  name: string;
}

interface ContactDetails {
  email: string;
  phone: string;
}

type BusinessContact = BusinessPartner & ContactDetails;

const contact: BusinessContact = {
  name: "jerome",
  email: "jajdjf",
  phone: "",
};

interface Individual {
  name: string;
  birthday: Date;
}

interface Organization {
  companyName: string;
  workPhone: string;
}

// we can also use |
type ContactType = Individual | Organization;
type CompContact = Individual & Organization;

function addContact(contact: ContactType) {
  if ("birthday" in contact) {
    console.log(contact.name, contact.birthday);
  } else {
    console.log(contact.companyName, contact.workPhone);
  }
}

///////////////////////TYPE GUARDS///////////////////////
/* checks what type a value is before operating on it, like with typeof & instanceof & in,
type narrowing with unions allows us to take a type that is more general*/

type StringOrNumber2 = string | number;

function add1(value: StringOrNumber2): StringOrNumber2 {
  if (typeof value === "string") {
    return value + "1";
  } else {
    return value + 1;
  }
}

class Horse {
  firstName: string;
  lastName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class Fish {
  firstName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
  }
}

/* custom type guard function using 'is'. It returns wether or not the argument passed
in the function is of a specfic type */
function isHorse(animal: Horse | Fish): animal is Horse {
  // we check for some type of value, here a property lastName that only exists in one of the class here Horse
  return (animal as Horse).lastName !== undefined;
}

function getName(animal: Fish | Horse) {
  // we can also use
  // if ('lastName' in animal)
  // or if (isHorse(animal)) with the custom type guard function
  // console.log("the name is", animal.firstName + " " + animal.lastName);
  if (animal instanceof Fish) {
    console.log("the name is", animal.firstName);
  } else {
    console.log("the name is", animal.firstName + " " + animal.lastName);
  }
}

///////////////////////DISCRIMINATED UNIONS///////////////////////
/* also known as tag type to perform type narrowing, it's a tag thats gonna be the same for all 
3 interfaces but actually contain a value */
type Log = Warning | Info | Success;

interface Warning {
  // the type is the tag type
  type: "warning";
  msg: string;
}

interface Info {
  type: "info";
  text: string;
}

interface Success {
  type: "success";
  message: string;
}

function handleMsg(log: Log) {
  switch (log.type) {
    case "warning":
      console.log(log.msg);
      break;
    case "info":
      console.log(log.text);
      break;
    case "success":
      console.log(log.message);
      break;
  }
}

///////////////////////UTILITY TYPES///////////////////////
/* built in types allowing us to manipulate existing types in various ways
there are 5 of them: Partial, Readonly, Record */

interface Todo {
  title: string;
  description: string;
}

// Partial utility type takes an existing type and makes all its properties optional
const updateTodo = (todo: Partial<Todo>) => {};

// Readonly utility type creates a new type where all properties are read only,
// you can access them but not change them
const myTodo: Readonly<Todo> = {
  title: "learn TS",
  description: "learn TS",
};
// myTodo.title 'hello' // error

// Record utility type defines a type with property names such as id and map the values to the type of the data
const pages: Record<string, Todo> = {
  home: { title: "home", description: "description" },
  about: { title: "about", description: "description" },
  contact: { title: "contact", description: "description" },
};

///////////////////////MODULES///////////////////////

///////////////////////NAMESPACES///////////////////////
