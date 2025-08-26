"use server";

import { success } from "better-auth";
import { auth } from "../lib/auth"; // path to your Better Auth server instance
 
 export const signinUser = async (email:string,password:string)=>{
    try{
        await auth.api.signInEmail({
            body:{
                email,
                password
            },
        });
        return{success:true, message:'Signed in Successfully'};
    }catch(error){
        const e = error as Error;
        return { success:false,message:e.message || "failed to sign in"}
        console.log(error);
    }
    
};

export const signupUser = async (email:string,password:string, name:string)=>{
    try{
        await auth.api.signUpEmail({
            body:{
                email,
                password,
                name,
            },
        });
        return{success:true, messsage:'Signed up Successfully'};
    }catch(error){
        const e = error as Error;
        return { success:false,message:e.message || "failed to sign up"}
        console.log(error);
    }
    
};