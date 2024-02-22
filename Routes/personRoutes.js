const express = require("express");
const Person = require("../models/Person-Model");
const router = express.Router();
const {jwtAuthMiddleware,generateToken}=require('../jwt');


router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    //create new person document using  the mongoose model
    const newPerson = new Person(data);

    //save the new person to the database
    const response = await newPerson.save();
  console.log("saved data");
  const payload={
    id:response.id,
    username:response.id
  }
  const token=generateToken(payload)
  console.log(JSON.stringify(payload));
  console.log("Token is generate:",token);
    res.status(200).json({response:response,token:token});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"internal server error"})
  }
});

//login route

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate Token
    const payload = {
      id: user.id,
      username: user.username
    };
    const token = generateToken(payload);

    // Return token as response
    res.json({ token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal login server error" });
  }
});

router.get('/',jwtAuthMiddleware,async(req,res)=>{
  try {
     const data=req.body;
     const resp=await Person.find(data)
     console.log('data fetched');
     res.status(200).json(resp);
  } catch (error) {
    console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
  }
})
//profile route
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
  try {
    const userdata=await req.user
    console.log(userdata);
    const userId=userdata.id
    const user=await Person.find(userId)
  } catch (error) {
    
  }
})

//PARAMETRIZED CALL
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });

      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Work Type" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonId = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatePersonId, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    // const deletePerson=await Person.findByIdAndRemove(personId)
    const deletePerson = await Person.findByIdAndDelete(personId);
    if (!deletePerson) {
      res.status(404).json({ error: "Person not found" });
    }

    res.status(200).json({ message: "data delete sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
