import * as React from "react"
import { Suspense } from "react"

import { getAllNotebooks } from "../server/notebook";
import { SidebarData } from "./sidebar-data"
import { SearchForm } from "@/components/search-form"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link";


export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const notebooks = await getAllNotebooks();

  
const data = {
  navMain: [
    ...(notebooks && notebooks.success && notebooks.data
      ? notebooks.data.map((notebook) => ({
          title: notebook.name,
          url:`/dashboard/notebook/${notebook.id}`,
          items: notebook.notes.map((note) => ({
            title: note.title,
            url : `/dashboard/notebook/${notebook.id}/note/${note.id}`,
            isActive: false, // or add logic to determine active state
          })),
        }))
      : []),
  ],
}


  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center w-full px-2">
          <Link
            href="/"
            aria-label="home"
            className="flex items-center space-x-2 text-xl sansation-bold-italic">
            NoteSnips
          </Link>
        </div>
        <Suspense fallback={null}>
          <SearchForm />
        </Suspense>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        <SidebarData data={data}/>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
