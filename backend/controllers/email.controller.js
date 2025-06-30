import { Email } from "../models/email.model.js";

export const createEmail = async (req, res) => {
    try {
        const userId = req.id;
        const { from, to, subject, message} = req.body;
        if(!to || !subject || !message) return res.status(400).json({message:"All fields are required", success:false});
        
        const email = await Email.create({
            from,
            to,
            subject,
            message,
            userId
        });
        return res.status(201).json({
            email
        })
    } catch (error) {
        console.log(error);
    }
}
export const deleteEmail = async (req,res) => {
    try {
        const emailId = req.params.id;
        
        if(!emailId) return res.status(400).json({message:"Email id is required"});

        const email = await Email.findByIdAndDelete(emailId);

        if(!email) return res.status(404).json({message:"Email is not found"});

        return res.status(200).json({
            message:"Email Deleted successfully"
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAllEmailById = async (req, res) => {
  try {
    const emails = await Email.find(); 
    return res.status(200).json({ emails });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch emails" });
  }
};
