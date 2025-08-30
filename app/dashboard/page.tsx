import { Logout } from "@/components/logout";
import { PageWrapper } from "@/components/page-wrapper";

import { getAllNotebooks } from "@/server/notebook";
import { not } from "drizzle-orm";
import { CreateNotebook } from "@/components/createNotebook";

export default async function dashboard() {
    const notebooks = await getAllNotebooks();
    return (
        <PageWrapper breadcrumbs={[{label:"Dashboard",href:"/dashboard"}]}>
            <h1>Notebooks</h1>

            <CreateNotebook/>
            
            {notebooks.success &&
                Array.isArray(notebooks?.data) &&
                notebooks.data.map((notebook) => (
                    <div key={notebook.id}>{notebook.name}</div>
                ))}
            {notebooks.success && Array.isArray(notebooks.data) && notebooks.data.length === 0 && <div>No notebooks found</div>}

          
        </PageWrapper>
    );
}
