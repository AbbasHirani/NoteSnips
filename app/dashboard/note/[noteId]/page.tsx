import {getNotebById} from "@/server/notes"
import { PageWrapper } from "@/components/page-wrapper"

type params = Promise<{ noteId: string }>

export default async function NotePage({params}:{params:params}) {
    const {noteId} =  await params;
    
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
        
        return (
            <PageWrapper breadcrumbs={[
                {label:"Dashboard",href:"/dashboard"},
                {label:note?.title,href:`/dashboard/note/${noteId}`}
                ]}>
                <h1>{note?.title}</h1>
                <p>{note?.content}</p>
            </PageWrapper>
        );
    } catch (error) {
        console.error("Error fetching note:", error);
        return <div>Error loading note</div>;
    }
}