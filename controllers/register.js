import bcrypt from 'bcrypt'
import users from "../module/usermodel.js";

export const register=async(req,res)=>{
    const {username,email,password,number}=req.body
    console.log(req.body);
    const userexists=await users.findOne({username:username})
  
    if(userexists){
        // console.log('log');
        res.send('user exists')
        return; 
    }
    
const hashedpassword=await bcrypt.hash(password,10) 

    users.insertOne({username:username,email:email,password:hashedpassword,number:number,role:'user',status:true})
    res.send('successfully completed')
    
   
    
}


//login section 


 export const loginfunction=async (req,res)=>{
    const {email,password}=req.body
    const user=await users.findOne({email:email})
    if(!user){
        res.send('incorect email');
        return
    } 
    const ismatch=await bcrypt.compare(password,user.password)
    if(!ismatch){
        res.send('incorect password');
        return;
    }
   
      req.session.username = user.name; 
      req.session.userid=user._id
    //   console.log('hi',user._id);
      
      await req.session.save()  
     res.send('success')
}


export const userSessionChecking= (req,res,next)=>{
    console.log('helo',req.session.userid)
    
    if(req.session.userid){
        console.log('user',req.session.userid);
        
        return next()
    }else{
        res.send('login')
        // return redirect('/admin/login')
        
    }
}


// login/admin
export const adminLoginfunction=async (req,res)=>{
   try{
     const {email,password}=req.body
    console.log(password);
    
    const user=await users.findOne({email:email})
    // console.log(user.email);
    
    if(!user){
        res.send('incorect email');
        return
    } else{
        if(user.role==='admin'){

            const ismatch=await bcrypt.compare(password,user.password)
            if(!ismatch){
            res.send('incorect password');
              return;
    }
    req.session.userrole = user.role; 
  

await req.session.save()
    res.send('success')

  
        }
    }
   }
   catch(err){
      console.error("Login error:", err);
    res.status(500).send("Server error");
  
   }
    
    
}

export const sessionChecking= (req,res,next)=>{
    console.log(req.session.userrole);
    if(req.session.userrole){
        console.log(req.session.userrole);
        
        return next()
    }else{
        res.send('login')
        // return redirect('/admin/login')
        
    }
}
