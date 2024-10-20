// named export is using export before the function name

function add(x: number, y: number): number {
  return x + y;
}

function sub(x: number, y: number): number {
  return x - y;
}

// putting it a the bottom allows to do several export at once
export { add, sub };

// default exports are not named
