"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form" 
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  name: z.string().min(2).max(50),
})

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react";
import { createNote } from "@/server/notes";

export const CreateNote = ({notebookId } : {notebookId : string}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
    setIsLoading(true);  
    const response = await createNote({title:values.name,content:{},notebookId});
    if (response.success){
        form.reset();
        setIsOpen(false);
        toast.success(response.message || "Note created successfully");
        router.refresh();
    }
    else{
        toast.error(response.message || "Something went wrong");
    }
  }catch(error){
    const e = error as Error;
    toast.error(e.message || "Something went wrong");
  }finally{
      setIsLoading(false);
      setIsOpen(false);
  }
    
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-max"> Create Note</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create A new Note</DialogTitle>
          <DialogDescription>
            Enter the name of your new note
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your Note Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button disabled={isLoading} type="submit">
              {isLoading ? (<Loader2 className="size-4 animate-spin" />) : ('Create')}
              
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};