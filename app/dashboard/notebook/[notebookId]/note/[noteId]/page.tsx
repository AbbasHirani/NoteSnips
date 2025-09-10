import {getNotebById} from "@/server/notes"
import { PageWrapper } from "@/components/page-wrapper"
import RichTextEditor from "@/components/rich-text-editor";
import { JSONContent } from "@tiptap/react";
import { getNotebookById } from "@/server/notebook";

interface PageProps {
  params?: Promise<{ notebookId: string; noteId: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function NotePage({ params }: PageProps) {
    const { noteId } = await (params ?? Promise.resolve({ notebookId: "", noteId: "" }));

    console.log("noteId:", noteId);

    try {
        const response = await getNotebById(noteId);
        console.log("response:", response);
        
        if (!response.success) {
            console.log("Error:", response.message);
            return <div>Error: {response.message}</div>;
        }
        
        const note = response.data?.[0]; // or however your data is structured
        console.log("note:", note);

        if (!note) {
            return <div>Error: Note not found</div>;
        }

        const notebook = await getNotebookById(note.notebookId);
        console.log("notebook:", notebook);
        
        return (
            <PageWrapper breadcrumbs={[
                {label:"Dashboard",href:"/dashboard"},
                {
                    label:notebook?.data?.name ?? "Notebook",
                    href:`/dashboard/notebook/${note?.notebookId}`
                },
                {label:note?.title ?? "Untitled",href:`/dashboard/note/${noteId}`}
                ]}>
                <h1>{note?.title}</h1>
                <RichTextEditor content={note?.content as JSONContent[]} noteId={noteId}/>
            </PageWrapper>
        );
    } catch (error) {
        console.error("Error fetching note:", error);
        return <div>Error loading note</div>;
    }
}