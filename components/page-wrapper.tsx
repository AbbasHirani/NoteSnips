import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { JSX } from "react"
import { SidebarTrigger } from "./ui/sidebar"
import { Logout } from "./logout"
import { ModeToggle } from "./mode-toggle"

interface PageWrapperProps{
    children:React.ReactNode,
    breadcrumbs:{
        map(arg0: (Breadcrumb: any) => JSX.Element): import("react").ReactNode
        label : string,
        href : string
    }
}

export function PageWrapper({children,breadcrumbs}:PageWrapperProps){
    return(
        <div className="flex flex-col gap-4 ">
        <header className="flex items-center p-4 border-b">
            <div className="flex items-center  justify-between w-full">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                
                
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbs.map((Breadcrumb)=>(
                        <BreadcrumbItem key={Breadcrumb.label}>
                            <BreadcrumbLink href={Breadcrumb.href}>
                                {Breadcrumb.label}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
                </Breadcrumb>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle/>
                    <Logout/>
                </div>
                
        </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 t-0">
            {children}
        </div>
    </div>
    )
}