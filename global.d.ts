// global.d.ts
declare module "*/note/[noteId]/page" {
  export interface PageProps {
    params: { noteId: string }
    searchParams?: { [key: string]: string | string[] | undefined }
  }
}
