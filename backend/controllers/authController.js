import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js'


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to wear4u',
            text: `Welcome to wear4u website. Your account has been created with email id: ${email}`
        };

        await transporter.sendMail(mailOptions);

        // ✅ Return the token in the response
        return res.json({ success: true, token });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // ✅ Return the token in the response
        return res.json({ success: true, token });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


export const logout = async (req,res)=>{
    try{
       res.clearCookie('token',{
        httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',

       })
       return res.json({success: true, message: 'Logged Out'});
    }catch(error){
        return res.json({ success: false, message: error.message })
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body; // Use req.body instead of register.body
        
        if (!userId) {
            return res.json({ success: false, message: "Missing userId" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        
        user.verifyOtpExpireAt = Date.now() + 2 * 60 * 1000;

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP.`
        };

        await transporter.sendMail(mailOption);

        return res.json({ success: true, message: 'Verification OTP sent to email' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body; // Use req.body instead of register.body

    if (!userId || !otp) {
        return res.json({ success: false, message: "Missing details" });
    }

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: 'Email verified successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//check if user is authenticated
export const isAuthenticated = async (req, res) =>{
   try{
      return res.json({success: true})
   }catch(error){
    return res.json({ success: false, message: error.message });
   }
}


//Send password reset OTP

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not Found' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 1 * 60 * 1000;

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting your password is ${otp}, Use this OTP to proceed with resetting your password.`
        };

        await transporter.sendMail(mailOption);

        // Send OTP and expiration time
        return res.json({
            success: true,
            message: 'OTP sent to your email',
            otpExpireAt: user.resetOtpExpireAt
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//RESET user Password

export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body
     
    if(!email || !otp || !newPassword){
        return res.json({success: false, message: 'Email, OTP, and new password are required'})
    }

    try{
        const user = await userModel.findOne({email});
        
        if(!user){
            return res.json({success: false, message: 'User not found'})
        }
        
        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({success: false, message: 'Invalid OTP'})
        }

        if(user.resetOtpExpireAt < Date.now()){
            return  res.json({success: false, message: 'OTP Expired'})
        }
         
         const hashedPassword = await bcrypt.hash(newPassword, 10);
         
         user.password = hashedPassword;
         user.resetOtp = '';
         user.resetOtpExpireAt = 0;

         await user.save();

         return res.json({success: true, message: 'Password has been reset successfully'})


    }catch(error){
        return res.json({sucess: false, message: error.message});
    }
}


export const verifyResetOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.json({ success: false, message: 'Email and OTP are required' });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // console.log('Received OTP:', otp);
        // console.log('Stored OTP:', user.resetOtp); 

        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }

        return res.json({ success: true, message: 'OTP is valid' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};




