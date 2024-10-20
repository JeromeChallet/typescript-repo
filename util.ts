// default exports are not named and can be imported with any name you want
function test() {
  return "test";
}

export const JEROME = 1;

// named export is using export before the function name
export function add(x: number, y: number): number {
  return x + y;
}

export function sub(x: number, y: number): number {
  return x - y;
}

// putting it a the bottom allows to do several export at once
//export { add, sub };

// it is convention to put the default export at the bottom and the regular export up
export default test;
