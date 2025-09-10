import { PageWrapper } from "@/components/page-wrapper";
import { getAllNotebooks } from "@/server/notebook";
import { CreateNotebook } from "@/components/createNotebook";
import NoteBookCard from "@/components/noteBookCard";

export default async function dashboard() {
    const notebooks = await getAllNotebooks();
    return (
        <PageWrapper breadcrumbs={[{label:"Dashboard",href:"/dashboard"}]}>
            <h1>Notebooks</h1>

            <CreateNotebook/>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {notebooks.success &&
                    Array.isArray(notebooks?.data) &&
                    notebooks.data.map((notebook) => (
                        <NoteBookCard key={notebook.id} notebook={notebook} />
                ))}
            </div>
            {notebooks.success && Array.isArray(notebooks.data) && notebooks.data.length === 0 && <div>No notebooks found</div>}

          
        </PageWrapper>
    );
}
