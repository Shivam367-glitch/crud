const mongoose=require('mongoose'); 
const validator=require('validator'); 


const usersSchema= new mongoose.Schema({
    FirstName:{
        type:String,
        require:true,
        trim:true
    },
    LastName:{
        type:String,
        require:true,
        trim:true
    },
    Mobile:{
        type:String,
        require:true,
        minlength: 10,
        maxlength: 10
    },
    Email:{
        type:String,
        require:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw Error("not valid email")
            }
        }
    },
    Location:{
        type:String,
        require:true,
    },
    Gender:{
        type:String,
        require:true,
    },
    Status:{
        type:String,
        require:true,
    },
    Profile:{
        type:Object,
        require:true,
    }
},
{
    timestamps: true,
}
);

const users=new mongoose.model('users',usersSchema); 

module.exports=users;

