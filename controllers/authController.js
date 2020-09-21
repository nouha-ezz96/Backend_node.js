const User = require('../models/users');
const jwt = require('jsonwebtoken');

// handeling errors
const handleErrors = (err)=>{
    console.log(err.message,err.code,err.name,err);
    let errors = {username:'',email:'', password:''};
    // incorrect email
    if(err.message.includes('Adresse e-mail incorrecte')){
        errors.email='Cette adresse e-mail n\'existe pas' ;
        return errors;
    }
    // incorrect password
    if(err.message.includes('Le mot de passe est incorrecte')){
        errors.password='Le mot de passe est incorrect';
        return errors;
    }
    // duplicated email and username errors
    if (err.code===11000){
        if(err.message.includes('username_1')){
        errors.username='Il existe déja un compte avec ce nom d\'utilisateur';
        }
        else if (err.message.includes('email_1')){
            errors.email='Il existe déja un compte avec cette adresse e-mail';
        }
       
        return errors;
     }
   // validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;

        });
    }
    return errors;

}

// creating the token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id)=>{
    return jwt.sign({id},'this is a secret',{expiresIn: maxAge});
}

module.exports.signup_post= async (req,res)=>{
    const {lastname , firstname, username, email, password ,accounttype } =req.body;
  try{
      const user = await User.create({lastname , firstname, username, email, password ,accounttype });
      const token = createToken(user._id);
      // setting the cookie
      res.cookie('jwt', token , { httpOnly : true, maxAge: maxAge*1000 });

      res.status(201).json({ user: user._id});

  }
  catch(err){
      const errors = handleErrors(err);
      res.status(400).json({errors});

  }
}

module.exports.login_post= async (req,res)=>{
    const {email ,password} =req.body;
    try {
        const user = await User.login(email,password);
        const token = createToken(user._id);
        // setting the cookie
        res.cookie('jwt', token , { httpOnly : true, maxAge: maxAge*1000 });
        res.status(200).json({user: user._id});
    }
    catch(err){
        const errors = handleErrors(err);
      res.status(400).json({errors});

        
    }
}

module.exports.signup_get=(req,res)=>{
    res.render('signup');
}

module.exports.login_get=(req,res)=>{
    res.render('login');
}

module.exports.logout_get=(req,res)=>{
    res.cookie('jwt','', { maxAge : 1});
    res.redirect('/');
    
}

module.exports.login_google = (req,res)=>{
    

}