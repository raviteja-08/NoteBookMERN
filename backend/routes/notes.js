const express= require("express")

const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Notes = require("../models/Notes")
const {body,validationResult} = require('express-validator')

router.get('/fetchallnotes',fetchUser,async(req,res)=>{
    const notes = await Notes.find({user:req.user.id});  
    res.send(notes);
})

router.post('/addnote',fetchUser,[
        body('title').isLength({min:3}),
        body('description').isLength({min:5})
        ],async(req,res)=>{
        try{

            const errors = validationResult(req);
            if(!errors.isEmpty){
                return res.status(400).json({errors:errors.array()});
            } 
            const note = new Notes({
                title:req.body.title,
                description:req.body.description,
                tag:req.body.tag,
                user:req.user.id
            })
            const saved= await note.save();
            return res.send(saved);
        }
        catch(err){
           return res.json({err:err.message});
        }
         

})
router.put('/updatenote/:id',fetchUser,async(req,res)=>{
    try{
        // should not change _id updation fails;
       const note = new Notes({
        _id:req.params.id,
        title:req.body.title,
        description:req.body.description,
        tag:req.body.tag
       })
       
    //const saved = Notes.updateOne()
        const oldNote = await Notes.findById(req.params.id);
        if(!oldNote){
            return res.status(400).json({msg:"not 1  found"})
        }
        if(oldNote.user.toString()!=req.user.id){
            return res.status(400).send({msg:"not  found"})
        }
        const saved = await Notes.findByIdAndUpdate(req.params.id,{$set:note},{new:true});
         res.json(saved)
    }
    catch(err){
        res.send("oij")
    }
})

router.delete('/delete/:id',fetchUser,async(req,res)=>{
    
     const note = await Notes.findById(req.params.id);
     if(!note){
        return res.status(400).send("no note found");
     }
     
     if(req.user.id!==note.user.toString()){
             return res.status(401).send("not allowed")
     }
     console.log(note)
     const deleted =await Notes.deleteOne({_id:req.params.id})
     res.send(deleted);

})



module.exports = router;


