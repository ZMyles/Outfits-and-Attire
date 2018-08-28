"use strict";
const express = require("express");
const accessories = express.Router();
const accessoryList = [
    {
        "brand": "Gucci", 
        "type": "watch",
        "material": ["tungsten", "silver", "radium"],
        "price": 200,
        "id": 0
    },
    {
        "brand": "Shinola", 
        "type": "watch",
        "material": ["gold-plating", "aluminum", "tin"],
        "price": 500,
        "id": 1        
    },
    {
        "brand": "Invicta", 
        "type": "Watch",
        "material": ["Gold", "Silver", "Obsidian", "Wood"],
        "price": 300,
        id: 2
    }        
];

let idCount = accessoryList.length;

accessories.get("/accessories", (req, res) => {
    res.send(accessoryList)    
})

accessories.delete("/accessories/:id", function(req, res){
    let count = 0;
    for (let accessory of accessoryList) {
        if (accessory.id == req.params.id) {
            accessoryList.splice(count, 1);
        }
        count++;        
    }
    res.send(accessoryList);                            
});

accessories.post("/accessories", (req, res) => {
    accessoryList.push({
        brand: req.body.brand,
        type: req.body.type,
        material: req.body.material,
        price: req.body.price,
        id: idCount++                                                                                                                                                        
    });
    res.send(accessoryList);                
});

accessories.put("/accessories/:id", function(req, res){
    let count = 0;
    console.log("Called put route");
    console.log(req.body);
    for (let accessory of accessoryList) {
        if (accessory.id == req.params.id) {
            let updatedAccessory = {
                brand: req.body.brand,
                type: req.body.type,
                material: req.body.material,
                price: req.body.price
            }
            updatedAccessory.id = accessory.id;
            accessoryList.splice(count, 1, updatedAccessory);
        }
        count++;        
    }
    res.send(accessoryList);                            
});


module.exports = accessories;