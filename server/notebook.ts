"use server"

import { auth } from "../lib/auth";
import { db } from "@/db/drizzle";
import { InsertNotebook, notebooks } from "../db/schema";
import { headers } from "next/headers";
import { eq, not } from "drizzle-orm";
import { tr } from "zod/v4/locales";

export const createNoteBook = async (values:InsertNotebook)=>{
    try{   
    const nokebook = await db.insert(notebooks).values(values);

    return {success:true, message:"Notebook created successfully"};
    }catch(error){
        const e = error as Error;
        return {success:false, message:e.message || "failed to create notebook"};
    }
};

export const getAllNotebooks = async ()=>{
    try{
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        const userId = session?.user?.id;

        if(!userId){
            return {success:false, message:"User not found"};
        }   
        
        const notebooksByUser = await db.query.notebooks.findMany({
            where: eq(notebooks.userId,userId),
            with: {
                notes: true
              },
        })
        return {success:true, data:notebooksByUser};
    }catch(error){
        const e = error as Error;
        return {success:false, message:e.message || "failed to get notebooks"};
    }
} 

export const getNotebookById = async (id:string)=>{
    try{
        const notebook = await db.query.notebooks.findFirst({
            where: eq(notebooks.id,id),
            with: {
                notes: true
            }
        });
        return {success:true, data:notebook};
    }catch(error){
        const e = error as Error;
        return {success:false, message:e.message || "failed to get notebook"};
    }
}

export const updateNotebook = async (id:string,values:InsertNotebook)=>{
    try{
        await db.update(notebooks).set(values).where(eq(notebooks.id,id));
        return {success:true, message:"Notebook updated successfully"};
    }catch(error){
        const e = error as Error;
        return {success:false, message:e.message || "failed to update notebook"};
    }
} 

export const deleteNotebook = async (id:string)=>{
    try{
        await db.delete(notebooks).where(eq(notebooks.id,id));
        return {success:true, message:"Notebook deleted successfully"};
    }catch(error){
        const e = error as Error;
        return {success:false, message:e.message || "failed to delete notebook"};
    }
}