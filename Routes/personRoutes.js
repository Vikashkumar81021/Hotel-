const express=require('express')
const Person=require('../models/Person-Model')
const router=express.Router()

router.post("/", async (req, res) => {
    try {
      const data = req.body;
      //create new person document using  the mongoose model
    const newPerson=new Person(data)
      //save the new person to the database
      const response = await newPerson.save();
      console.log("data saved", response);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
       
    }
  });
  
  router.get("/", async(req, res) => {
    try {
      const data = await Person.find();
      console.log("data feteched", data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  });
    
  //PARAMETRIZED CALL 
  router.get('/:workType',async (req,res)=>{
    try {
        const workType=req.params.workType;
        if(workType=="chef" || workType=="manager" || workType=="waiter"){
          const response= await Person.find({work:workType})
          console.log('response feteched')
          res.status(200).json(response)
        }else{
          res.status(404).json({error:"Invalid Work Type"})
        }
    } catch (error) {
     
      res.status(500).json({ error: "internal server error" });
    }
  })

  //update
  router.put('/:id',async(req,res)=>{
    try {
       const personId=req.params.id;
       const updatePersonId=req.body;
       const response=await Person.findByIdAndUpdate(personId,updatePersonId,{
        new:true,
        runValidators:true
       });
       if(!response){
        res.status(404).json({error:"Person not found"})
       }
       console.log("data update from Person-models");
       res.status(200).json(response)
    } catch (error) {
      console.log(error);
      res.status(500).json({error:"internal server error"}) 
    }
  })

  //delete
  router.delete('/:id',async(req,res)=>{
    try {
      const personId=req.params.id;
      // const deletePerson=await Person.findByIdAndRemove(personId)
      const deletePerson= await Person.findByIdAndDelete(personId) 
      if(!deletePerson){
        res.status(404).json({error:"Person not found"})
      }  
      console.log(" Person data deleted from Person");
      res.status(200).json({message:"data delete sucessfully"})
    } catch (error) {
       console.log(error);
       res.status(500).json({error:"internal server error"})
    }
  })
  
  module.exports=router;