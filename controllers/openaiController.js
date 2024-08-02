
// const errorResponse = require("../utils/errorResponse");

// const errorHandler = (err, req, res, next) => {
//   let error = { ...err };
//   error.message = err.message;

//   //mongoose cast Error
//   if (err.name === "castError") {
//     const message = "Resources Not Found";
//     error = new errorResponse(message, 404);
//   }
//   //duplicate key error
//   if (err.code === 11000) {
//     const message = "Duplicate field value enterd";
//     error = new errorResponse(message, 400);
//   }
//   //mongoose validation
//   if (err.name === "ValidationError") {
//     const messgae = Object.values(err.errors).map((val) => val.message);
//     error = new errorResponse(message, 400);
//     res.status(error.statusCode || 500).json({
//       success: false,
//       error: error.message || "Server Error",
//     });
//   }
// };

// module.exports = errorHandler;


const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");

// Initialize OpenAI with the API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const prompt = `Summarize this:\n${text}`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 500,
      temperature: 0.5,
    });

    const summary = response.data.choices[0].text.trim();
    return res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "An error occurred",
    });
  }
};
