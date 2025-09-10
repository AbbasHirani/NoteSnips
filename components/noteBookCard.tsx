"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, Trash2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner";
import {useRouter} from "next/navigation";
import { deleteNotebook } from "@/server/notebook";
import { useState } from "react";

interface Notebook {
    id: string;
    name: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string;
    notes: {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        title: string;
        content: unknown;
        notebookId: string;
    }[];
}

interface NoteBookCardProps {
    notebook:Notebook,
}

export default function NoteBookCard({notebook}:NoteBookCardProps) {
    const router = useRouter();

    const [isdeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const hadleDelete = async() => {
        try{
            setIsDeleting(true);
            const response = await deleteNotebook(notebook.id);
            if (response.success) {
                toast.success(response.message);
                router.refresh();
            }
        }catch(_error){
            toast.error("Something went wrong");
        }finally{
            setIsDeleting(false);
            setIsOpen(false);
        }
        
    }

    return (
        <>
        <Card>
        <CardHeader>
            <CardTitle> {notebook.name} </CardTitle>
            <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
            <p> {notebook.notes?.length ?? 0} </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <Link href= {`/dashboard/notebook/${notebook.id}`}>
                <Button variant="outline" >
                    View
                </Button>
            </Link>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger><Button variant="destructive"  disabled={isdeleting}>
                {isdeleting ? (<Loader2 className="size-4 animate-spin"/>) : (<Trash2 className="size-4"></Trash2>
                )}
                Delete
            </Button></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your notebook
                        and all of your notes.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={hadleDelete}>
                        Continue
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </CardFooter>
        </Card>

        
        </>
    )
}