const db = require("../models");
const User = db.user
exports.getUser = async(req,res)=>{
    try {
        const user = await User.findAll();
        if(user && user.length){
            res.send({ data:user });
        }
    }  catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getUserById = async(req,res) =>{
    try {
        const id = req.params.id;
        const user = await User.findOne({
            where:{
                id:id
            }
        })
        if(user){
            res.send({ data:user }); 
        }else{
            res.send({message:'User Not Found'})
        }
    }  catch (error) {
        res.status(500).send({ message: error.message });
    }
}
exports.userEdit = async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email},{
            where: {
                id: id
            }
        })
        if(user){
            res.send({message:'User Updated Successfully' }); 
        }else{
            res.status(400).send({message:'User Not Updated'})
        }
    }  catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.userDelete = async(req,res)=>{
    try {
        console.log('dsd3', )
        const id = req.params.id;
        if(id){
            const user = await User.destroy({
                where: {
                    id: id
                }
            })
            if(user){
                res.send({message:'User Deleted Successfully' }); 
            }else{
                res.status(400).send({message:'User Not Updated'})
            }
        }else{
            res.status(400).send({message:'User Not Found'})
        }
    }  catch (error) {
        res.status(500).send({ message: error.message });
    }

}