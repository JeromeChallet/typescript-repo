///////////////////////PRIMITIVE TYPES///////////////////////
// they basic data types that represent a single value
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
  Rigth = "Right",
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

///////////////////////OPTIONAL CHAINING & BANG///////////////////////

///////////////////////BASIC FUNCTION TYPES///////////////////////

///////////////////////ADVANCED FUNCTION TYPES///////////////////////

///////////////////////INTERFACES///////////////////////

///////////////////////CLASSES & ABSTRACT CLASSES///////////////////////

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
