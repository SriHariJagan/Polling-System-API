const Question = require('../models/questionSchema'); // Question model
const Option = require('../models/optionSchema'); // Option model

// Controller to create a new question
module.exports.createQuestion = async (req, res) => {
    try {
        await Question.create(req.body); // Create a new question with the provided data
        res.redirect('back'); // Redirect to the previous page
    } catch (err) {
        console.log("Error in createQuestion", err); // Log any errors
    }
}

// Controller to create a new option for a question
module.exports.createOption = async (req, res) => {
    try {
        const question = await Question.findById(req.body.question); // Find the question by ID
        if (question) {
            const option = await Option.create({
                option: req.body.option, // Option text
                question: req.body.question // Associate option with question
            });
            question.options.push(option); // Add option to the question's options array
            await question.save(); // Save the updated question
        }
        res.redirect('back'); // Redirect to the previous page
    } catch (err) {
        console.log("Error in creating option", err); // Log any errors
    }
}

// Controller to delete a question and its associated options
module.exports.deleteQuestion = async (req, res) => {
    const questionId = req.params.id; // Get the question ID from request parameters
    const question = await Question.findByIdAndDelete(questionId); // Delete the question by ID
    const option = await Option.deleteMany({ question: questionId }); // Delete all options associated with the question
    res.redirect('back'); // Redirect to the previous page
}

// Controller to delete an option
module.exports.deletOption = async (req, res) => {
    const optionId = req.params.optionId; // Get the option ID from request parameters
    const option = await Option.findById(optionId); // Find the option by ID
    if (option) {
        let qId = option.question._id; // Get the associated question ID
        const question = await Question.findByIdAndUpdate(qId, { $pull: { options: optionId } }); // Remove option from question
    }
    const optionDelete = await Option.findByIdAndDelete(optionId); // Delete the option by ID
    res.redirect('back'); // Redirect to the previous page
}

// Controller to handle voting on options
module.exports.votes = async (req, res) => {
    const optionId = req.params.id; // Get the option ID from request parameters
    const option = await Option.findById(optionId); // Find the option by ID
    const userId = req.user._id; // Get the current user ID
    const alreadyVoted = option.voters.includes(userId); // Check if the user has already voted

    if (alreadyVoted) {
        // If user has already voted, decrement the vote count
        option.votes--;
        // Remove the user from the voters list
        option.voters.pull(userId);
    } else {
        // If user has not voted, increment the vote count
        option.votes++;
        // Add the user to the voters list
        option.voters.push(userId);
    }

    await option.save(); // Save the updated option
    console.log(option); // Log the updated option for debugging
    res.redirect('back'); // Redirect to the previous page
}
