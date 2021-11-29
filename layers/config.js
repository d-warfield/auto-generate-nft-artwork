import fs from "fs";
import path from "path";

// get current directory type
const dir = path.join(path.resolve(), "layers");

// rarity assignments for each layer element
const rarity = [
  { key: "", val: "very common" },
  { key: "_c", val: "common" },
  { key: "_r", val: "rare" },
  { key: "_vr", val: "very rare" },
];

// get the image elements in each layer folder
const getElements = (path) => {
  return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      return {
        id: index + 1,
        fileName: i,
        name: cleantype(i),
        rarity: addRarity(i),
      };
    });
};

// clean element file type
const cleantype = (_str) => {
  // remove .png
  let type = _str.slice(0, -4);

  // loop through rarity and remove rarity.key from file type
  rarity.forEach((r) => {
    type = type.replace(r.key, "");
  });
  return type;
};

// add rarity to file type
const addRarity = (_str) => {
  let itemRarity;

  rarity.forEach((r) => {
    if (_str.includes(r.key)) {
      itemRarity = r.val;
    }
  });

  return itemRarity;
};

// array of layers
const layers = [
  {
    id: 0,
    type: "background",
    location: `${dir}/background/`,
    elements: getElements(`${dir}/background/`),
  },
  {
    id: 1,
    type: "base",
    location: `${dir}/base/`,
    elements: getElements(`${dir}/base/`),
  },
  {
    id: 2,
    type: "eyes",
    location: `${dir}/eyes/`,
    elements: getElements(`${dir}/eyes/`),
  },
  {
    id: 3,
    type: "hair",
    location: `${dir}/hair/`,
    elements: getElements(`${dir}/hair/`),
  },
  {
    id: 4,
    type: "hands",
    location: `${dir}/hands/`,
    elements: getElements(`${dir}/hands/`),
  },
  {
    id: 5,
    type: "mouth",
    location: `${dir}/mouth/`,
    elements: getElements(`${dir}/mouth/`),
  },
  {
    id: 6,
    type: "socks",
    location: `${dir}/socks/`,
    elements: getElements(`${dir}/socks/`),
  },
  {
    id: 7,
    type: "shoes",
    location: `${dir}/shoes/`,
    elements: getElements(`${dir}/shoes/`),
  },
];

export default layers;
