const  Question = require('../models/questionSchema');
const Option = require('../models/optionSchema');

//to Create Questions
module.exports.createQuestion = async (req,res) => {
    try{
        console.log(req.body);
        Question.create(req.body);
        res.redirect('back');
    }catch(err){
        console.log("error in creatQuestion",err);
    }
}

//To Create Options
module.exports.createOption = async (req,res) => {
    try{
        const question = await Question.findById(req.body.question);
        if(question){
            const option = await Option.create({
                option: req.body.option, 
                question: req.body.question
            });
            question.options.push(option);
            await question.save()
        }
        res.redirect('back');
    }catch(err){
        console.log("error in creating option",err);        
    }
}

// To Delete Questions
module.exports.deleteQuestion =async (req,res) => {
    const questionId = req.params.id;
    const question = await Question.findByIdAndDelete(questionId)
    // console.log(question);

    const option = await Option.deleteMany({ question: questionId });
    // console.log(option);
    res.redirect('back');
}


// To Delete Options
module.exports.deletOption = async (req,res) => {
    // console.log(req.params);
    const optionId = req.params.optionId;
    const option = await Option.findById(optionId);
    if(option){
        let qId = option.question._id;
        const question = await Question.findByIdAndUpdate(qId,{$pull:{
            options : optionId
        }})
    }
    const optionDelet = await Option.findByIdAndDelete(optionId);
  
    res.redirect('back');
}

// To Vote the Options
module.exports.votes = async (req,res) => {
    // console.log(req.params);
    const optionId = req.params.id;
    const option = await Option.findById(optionId);
    const userId = req.user._id; 
    const alreadyVoted = option.voters.includes(userId);
    

    if (alreadyVoted) {
        // User has already voted, decrement the vote count
        option.votes--;
        // Remove the user from voters list
        option.voters.pull(userId);
    } else {
        // User has not voted yet, increment the vote count
        option.votes++;
        voted = true;
        // Add the user to voters list
        option.voters.push(userId);
    }

    await option.save();
    console.log(option);
    res.redirect('back');
}
