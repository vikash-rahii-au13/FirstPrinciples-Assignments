import User from '../models/User';
import Helper from '../config/helper';
import multer from 'multer';
import mongoose from 'mongoose';

module.exports = {
    myProfile:(req,res)=>{
        try {
            const userId = req.user.id;
            const userData = User.findOne({_id:mongoose.Types.ObjectId(userId)},{name:1, email:1, profileImage:1, coverImage:1, status:1})
            userData.exec((err, user)=>{
                if(err || !user){
                    return Helper.response(res, 400, "User not found.")                    
                }
                var rsss = {userData:user}
                return Helper.response(res, 200, "User details fetched succssefully.", rsss)                    

            })            
        } catch (error) {
            console.log(">>>>>",error)
            return Helper.response(res, 500, "Server error.")                                
        }
    },

    changeProfilePic:(req,res)=>{   
            const userId = req.user.id;
            const profileImage = req.file.path;
            if(typeof req.file === "undefined"){
                return Helper.response(res, 400, "ProfileImage not found.")                    
            }
             User.findOne({_id:mongoose.Types.ObjectId(userId)}, (err, user)=>{
                if(err ||  !user){
                    return Helper.response(res, 400, "User not found.")                    
                }
                user.profileImage = profileImage;
                user.save() 
                  .then(doc=>{
                      doc.profileImage = "http://localhost:3000" +"/uploads" + req.file.filename;
                      var rsss = {"userData":user}
                      return Helper.response(res, 200, "Profile image changed sucessfully.", rsss)                    

                  }).catch(err=>{
                    return Helper.response(res, 500, "Server error.")                                

                  })
            })
    },
    changeCoverPic:(req,res)=>{   
            const userId = req.user.id;
            const coverImage = req.file.path;
            if(typeof req.file === "undefined"){
                return Helper.response(res, 400, "CoverImage not found.")                    
            }
             User.findOne({_id:mongoose.Types.ObjectId(userId)}, (err, user)=>{
                if(err ||  !user){
                    return Helper.response(res, 400, "User not found.")                    
                }
                user.coverImage = coverImage;
                user.save() 
                  .then(doc=>{
                      doc.coverImage = "http://localhost:3000" +"/uploads" + req.file.filename;
                      var rsss = {"userData":user}
                      return Helper.response(res, 200, "Cover image changed sucessfully.", rsss)                    

                  }).catch(err=>{
                    return Helper.response(res, 500, "Server error.")                                

                  })
            })
        
    }
}