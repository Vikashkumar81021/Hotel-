const express = require("express");
const MenuItem = require("../models/MenuItem-model");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("data saved Menu-Item", response);
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({error:"internal server error "})
  }
});


router.get('/',async(req,res)=>{
    try {
        const menuData= await  MenuItem.find()
        console.log("data feteched from Menu-Item", menuData);
        res.status(200).json(menuData)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
})

//PARAMETRIZED CALL 

router.get('/:taste',async(req,res)=>{
  try {
      const menuTaste=req.params.taste;
      if(menuTaste=="spicy" || menuTaste=="sour" || menuTaste=="sweet"){
        const response=await MenuItem.find({taste:menuTaste})
        console.log('menu taste data feteched from MenuItem')
        res.status(200).json(response)
      }else{
       res.status(400).json({error:"taste not found"})
      }
  } catch (error) {
    
  }
})

//update
router.put('/:id',async(req,res)=>{
  try {
    const menuId=req.params.id;
    const updateMenuId=req.body;
    const response= await MenuItem.findByIdAndUpdate(menuId,updateMenuId,{
      new:true,
      runValidators:true
    })
    if(!response){
      res.status(404).json({error:"Menu not found"})
    } 
    console.log("data update from menu");
    res.status(200).json(response)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"internal server error"}) 
  }
})

//delete
router.delete('/:id',async(req,res)=>{
  try {
    const menuID=req.params.id;
    const deleteMenu=await MenuItem.findByIdAndDelete(menuID)
    if(!deleteMenu){
      res.status(404).json({error:"MenuId not found"})
    }
    console.log("data delete from menu item");
    res.status(200).json({message:"menuItem deleted successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"internal server error"})
  }
})
module.exports=router