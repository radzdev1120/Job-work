import asycHandler from 'express-async-handler';
import User from  "../models/UserModel.js";

// Create a new user
export const createUser = asycHandler(async (req, res) => {
    try {
        const { 
            name, 
            email, 
            password, 
            role = "jobseeker",
            profession,
            phone,
            location,
            linkedin,
            github,
            website,
            bio,
            skills,
            education,
            experience,
            company,
            position
        } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: "Please provide all required fields: name, email, and password" 
            });
        }

        // Check if user already exists (either by email or auth0Id)
        const existingUser = await User.findOne({ 
            $or: [
                { email: email },
                { auth0Id: `local_${email}` }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ 
                message: "User already exists with this email" 
            });
        }

        // Create new user with local auth0Id format
        const newUser = new User({
            name,
            email,
            role,
            auth0Id: `local_${email}`, // Using email as part of auth0Id for local users
            profilePicture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`, // Generate avatar
            profession,
            phone,
            location,
            linkedin,
            github,
            website,
            bio,
            skills,
            education,
            experience,
            company,
            position
        });

        await newUser.save();

        // Return user data (excluding sensitive information)
        const userData = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            profilePicture: newUser.profilePicture,
            profession: newUser.profession,
            phone: newUser.phone,
            location: newUser.location,
            linkedin: newUser.linkedin,
            github: newUser.github,
            website: newUser.website,
            bio: newUser.bio,
            skills: newUser.skills,
            education: newUser.education,
            experience: newUser.experience,
            company: newUser.company,
            position: newUser.position,
            createdAt: newUser.createdAt
        };

        return res.status(201).json({
            message: "User created successfully",
            user: userData
        });
    } catch (error) {
        console.log("Error in createUser: ", error);
        
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            return res.status(400).json({
                message: "A user with this email already exists"
            });
        }

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

export const getUserProfile = asycHandler(async (req, res) => {
    try {
      const { id } = req.params;
      
      const user = await User.findOne({ auth0Id: id });

      if(!user){
        return res.status(404).json({ message: "User not found" });
      }
      
      return res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserProfile: ", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
});