import {getNotebookById} from "@/server/notebook"
import { PageWrapper } from "@/components/page-wrapper"
import NoteCard from "@/components/notecard";
import { CreateNote } from "@/components/createNote";


export default async function NoteBookPage({ params }: { params: { notebookId: string } }) {
    const { notebookId } = params;

    console.log("notebookId:", notebookId);
    
    try {
        const response = await getNotebookById(notebookId);
        console.log("response:", response);
        console.log("response:", response.data?.name);
        
        if (!response.success) {
            console.log("Error:", response.message);
            return <div>Error: {response.message}</div>;
        }
        
        const notebook = response.data; // Fetch the Notebook
        const note = response?.data?.notes[0]; //Extract the Note
        console.log("note:", note);
        console.log("notebook:", notebook);
        
        return (
            <>
            <PageWrapper breadcrumbs={[
                {label:"Dashboard",href:"/dashboard"},
                {label:notebook?.name ?? "Notebook",href:`/dashboard/notebook/${notebookId}`}
                ]}>
                <h1>Notes</h1>
                <CreateNote notebookId={notebookId}/>   
            </PageWrapper>
             
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-4">
                {notebook?.notes.map((note) => (
                    <NoteCard key={note.id} note={note} />
                ))}
            </div>
            </>
        );
    } catch (error) {
        console.error("Error fetching note:", error);
        return <div>Error loading note</div>;
    }
}