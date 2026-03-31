/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
 *   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
 *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
 *   // red and blue objects are UNCHANGED
 */
export function mixColors(color1, color2) {
  // Your code here
  if(color1 === null || color2 === null || typeof(color1)!=="object" || typeof(color2)!== "object") return null;

  let col3 = {name:"",r:0,g:0,b:0};
  col3.r = Number(((color1.r + color2.r)/2).toFixed(0))
  col3.g = Number(((color1.g + color2.g)/2).toFixed(0))
  col3.b = Number(((color1.b + color2.b)/2).toFixed(0))
  col3.name = `${color1.name}-${color2.name}`
  return col3;
}

export function adjustBrightness(color, factor) {
  // Your code here
  if(color === null || typeof(factor)!=="number") return null;

  let col = structuredClone(color);
  col.r = Math.round(Math.max(0,Math.min(255,col.r*factor)));
  col.g = Math.round(Math.max(0,Math.min(255,col.g*factor)));
  col.b = Math.round(Math.max(0,Math.min(255,col.b*factor)));
  return col;
}

export function addToPalette(palette, color) {
  // Your code here
  if(!Array.isArray(palette)) return [color];
  if(color === null || typeof(color)!=="object") return structuredClone(palette);
  var res = structuredClone(palette);
  //var colArr = Object.entries(color);
  res.push(color);
  return res;

}

export function removeFromPalette(palette, colorName) {
  // Your code here
  if(!Array.isArray(palette)) return [];
  let res = structuredClone(palette);
  res = res.filter((e)=>e.name!==colorName);
  return res;
}

export function mergePalettes(palette1, palette2) {
  // Your code here
  if(!Array.isArray(palette1)) palette1 = [];
  if(!Array.isArray(palette2)) palette2 = [];

  let arr1 = structuredClone(palette1);
  let arr2 = structuredClone(palette2);

  var obj = {};
  let res = [];
  for(const item of arr1)
  {
    if(!obj.hasOwnProperty(item.name))
    {
      obj[item.name] = 1;
      res.push(item);
    }
  }
  for(const item of arr2)
  {
    if(!obj.hasOwnProperty(item.name))
    {
      obj[item.name] = 1;
      res.push(item);
    }
  }
  return res;

}
