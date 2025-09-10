"use server"

import { auth } from "../lib/auth";
import { db } from "@/db/drizzle";
import { InsertNote, notes } from "../db/schema";
import { headers } from "next/headers";
import { eq, not, sql } from "drizzle-orm";

export const createNote = async (values:InsertNote)=>{
    try{   
    await db.insert(notes).values(values);

    return {success:true, message:"Notebook created successfully"};
    }catch(error){
        const e = error as Error;
        return {success:false, message:e.message || "failed to create notebook"};
    }
};

// export const getAllNotes = async ()=>{
//     try{
//         const session = await auth.api.getSession({
//             headers: await headers(),
//         });
//         const userId = session?.user?.id;

//         if(!userId){
//             return {success:false, message:"User not found"};
//         }   
        
//         const notesByUser = await db.select().from(notes).where(eq(notes.userId,userId));
//         return {success:true, data:notesByUser};
//     }catch(error){
//         const e = error as Error;
//         return {success:false, message:e.message || "failed to get notebooks"};
//     }
// } 

// export const getNotebById = async (id:string)=>{
//     try{
//         const note = await db.select().from(notes).where(eq(notes.id,id));
//         return {success:true, data:note};
//     }catch(error){
//         const e = error as Error;
//         return {success:false, message:e.message || "failed to get notebook"};
//     }
// }

export const getNotebById = async (id: string) => {
    try {
        console.log("Searching for note with ID:", id);
        
        // Get ALL notes first
        const allNotes = await db.select().from(notes);
        console.log("All notes:", allNotes);
        
        // Filter by trimmed ID match
        const trimmedSearchId = id.trim();
        const matchingNote = allNotes.filter(note => 
            note.id.trim() === trimmedSearchId
        );
        
        console.log("Matching note:", matchingNote);
        
        return { success: true, data: matchingNote };
    } catch (error) {
        console.error("Database error:", error);
        const e = error as Error;
        return { success: false, message: e.message };
    }
}



// export const updateNote = async (id:string,values:Partial <InsertNote>)=>{
//     try{
//         await db.update(notes).set(values).where(eq(notes.id,id));
//         return {success:true, message:"Note updated successfully"};
//     }catch(error){
//         const e = error as Error;
//         return {success:false, message:e.message || "failed to update note"};
//     }
// } 

export const updateNote = async (id: string, values: any) => {
  try {
    console.log("updateNote called with:", id, values);
    
    // Get all notes first to handle the trimming issue
    const allNotes = await db.select().from(notes);
    console.log("All notes:", allNotes.map(n => ({ id: n.id, trimmed: n.id.trim() })));
    
    // Use JavaScript filter to match trimmed IDs
    const matchingNotes = allNotes.filter(note => 
      note.id.trim() === id.trim()
    );
    
    if (matchingNotes.length === 0) {
      console.log("No matching note found for ID:", id);
      return { success: false, message: "Note not found" };
    }
    
    console.log("Found matching note:", matchingNotes[0]);
    
    // Update using the exact ID from database
    const result = await db.update(notes)
      .set(values)
      .where(eq(notes.id, matchingNotes[0].id)); // Use the exact DB ID
    
    console.log("Update result:", result);
    
    return { success: true, message: "Note updated successfully" };
  } catch (error) {
    console.error("Update error:", error);
    const e = error as Error;
    return { success: false, message: e.message };
  }
};

export const deleteNote = async (id:string)=>{
    try{
        await db.delete(notes).where(eq(notes.id,id));
        return {success:true, message:"Note deleted successfully"};
    }catch(error){
        const e = error as Error;
        return {success:false, message:e.message || "failed to delete note"};
    }
}