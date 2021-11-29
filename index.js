// file system
import fs, { writeFileSync } from "fs";
const myArgs = process.argv.slice(2);

// create and load images
import pkg from "canvas";
const { createCanvas, loadImage } = pkg;

// import layers from layers folder config file
import layers from "./layers/config.js";

// canvas constants
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_DRAW_X,
  CANVAS_DRAW_Y,
} from "./constants.js";

// create the image size
const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

// get underlying canvas context to draw, create shapes, etc.
const ctx = canvas.getContext("2d");

const editionSize = myArgs.length > 0 ? Number(myArgs[0]) : 1;

var metadata = [];
var attributes = [];
var hash = [];
var decodedHash = [];

const saveLayer = (_edition) => {
  writeFileSync(`./generated/${_edition}.png`, canvas.toBuffer("image/png"));
};

const addMetadata = (_edition) => {
  let tempMetadata = {
    hash: hash.join(""),
    decodedHash: decodedHash,
    edition: _edition,
    date: Date.now(),
    attributes: attributes,
  };
  metadata.push(tempMetadata);
  attributes = [];
  hash = [];
  decodedHash = [];
};

const addAttributes = (_element, _layer) => {
  let tempAttribute = {
    id: _element.id,
    layer: _layer.type,
    name: _element.name,
    rarity: _element.rarity,
  };
  attributes.push(tempAttribute);
  hash.push(_layer.id);
  hash.push(_element.id);
  decodedHash.push({ [_layer.id]: _element.id });
};

const drawLayer = async (_layer, _edition) => {
  let element =
    _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
  addAttributes(element, _layer);
  // get image data and draw image
  const image = await loadImage(`${_layer.location}${element.fileName}`);

  ctx.drawImage(
    image,
    CANVAS_DRAW_X,
    CANVAS_DRAW_Y,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );

  saveLayer(_edition);
};

for (let i = 0; i < editionSize; i++) {
  layers.forEach((layer) => {
    drawLayer(layer, i);
  });
  addMetadata(i);
}

fs.readFile("./generated/_metadata.json", (err, data) => {
  if (err) throw err;
  fs.writeFileSync("./generated/_metadata.json", JSON.stringify(metadata));
});
