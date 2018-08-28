"use strict";

const express = require("express");
const clothes = express.Router();
const outFits = [
  {
    brand: "Nike",
    shirt: "Polo",
    size: "40"
  },
  {
    brand: "polo",
    shirt: "button-up",
    size: "40"
  },
  {
    brand: "Target",
    shirt: "tank-Top",
    size: "40"
  }
];

let idCount = outFit.lenght;

clothes.get("/clothes", (req, res) => {
  res.send(outFit);
});

clothes.post("/clothes", (req, res) => {
  res.push({
    brand: req.body.brand,
    shirt: req.body.shirt,
    size: req.body.size,
    id: idCount++
  });
  res.send(outFits);
});

clothes.put("/clothes", (req, res) => {
  let count=0;
  for(let cloth of outFit) {
    if (cloth.id == req.params.id) {
        outFit.splice(count, 1, req.body);
    }
    count++;
  }
  res.send(outFit);
});

clothes.delete("/clothes", (req, res) => {
  let count=0;
  for(let cloth of outFit) {
    if (cloth.id == req.params.id) {
        outFit.splice(count, 1);
    }
    count++;
  }
});

module.exports = outFit;