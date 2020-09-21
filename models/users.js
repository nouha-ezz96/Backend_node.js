const mongoose = require ('mongoose');
const {isEmail} = require ('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    lastname:{
        type: String,
        required: true,
        maxlength : 20
    },

    firstname : {
        type : String,
        required : true ,
        maxlength: 20 
    },
    username : {
        type : String, 
        required : true,
        unique: true
    },
    email:{
        type:String,
        required : [true,'Entrez votre adresse e-mail SVP'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Entrez une adresse e-mail SVP']

    },
    password:{ 
            type: String ,
            required: [true , 'Entrez un mot de passe SVP'],
            minlength: [8 , 'le mot de passe doit contenir au moin 8 caractères']
            
    },
    
    accounttype:{ type: Number
    }
});

// mongoose hooks
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
// static method to login user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email })
    if(user){
        const exist = await bcrypt.compare(password , user.password);
        if(exist){
            return user;
        }
        
        throw Error ('Le mot de passe est incorrecte');
    }
    throw Error ('Adresse e-mail incorrecte');
}; 



const User = mongoose.model('user', userSchema);
module.exports= User;