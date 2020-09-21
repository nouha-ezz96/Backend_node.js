const mongoose = require ('mongoose');

const profileSchema = new mongoose.Schema({
    image: String, 
    rating: Number,
    region : String,
    phone : String,
    postalCode : String,
      
    //freelancer
    yearsOfExperience:Number,
    professionalTitle:String,
    dailyIncome:Number,
    availabilityDate:Date,
    isAvailableForEmployment:Boolean,
    isAvailableForMission:Boolean,
    isAvailableForTeleWorking:Boolean,
    technicalSkills:[{
        type: String
    }],
    functionalSkills:[{
        type: String
    }],
    categories:[{
        type: String
    }],
    linkedinProfile:String,
    cv:any,
    //client+esn
    entreprise:String,
    group:String,
    department:String,
    function:String,
    //esn
    intercontracts:[{
        type: String
    }]

})

const Profile = mongoose.model('profile',profileSchema);
module.exports = Profile;