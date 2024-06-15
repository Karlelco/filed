"use client";
import NewFile from "@/app/custom/addFile";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";

export default function Component() {
  const { user } = useKindeBrowserClient();
  const files = useQuery(api.myFunctions.getFilesByDirectoryId, {
        directoryId: user?.id as string,
      }) 
      console.log(files);

  const filedType = files?.map((type) => type.type?.contentType);
  console.log(filedType)
    

    return (
      <main className="flex flex-1  items-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {files ? (
            <h3 className="text-2xl font-bold tracking-tight">
              <div className="py-2 ">
                <NewFile />
              </div>
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                {files?.map((file: any) => (
                  <div key={file._id} className="bg-gray-200 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">{file.filename}</h3>
                    <Image
                      className="text-sm text-gray-500 h-32 w-32 rounded-lg"
                      alt=""
                      src={getFileIconUrl(file)}
                      width={400}
                      height={400}
                    />
                  </div>
                ))}
              </div>
            </h3>
          ) : (
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                You have no Files
              </h3>
              <Image
                className="text-sm text-gray-500 rounded-lg"
                alt=""
                src={`https://img.icons8.com/?size=100&id=J6E9pYmAhHuk&format=png&color=E42424`}
                width={400}
                height={400}
              />

              <p className="text-sm text-gray-500">
                You can start by adding some Files.
              </p>
              <div>
                <NewFile />
              </div>
            </div>
          )}
        </div>
      </main>
    );

    function getFileIconUrl(file: any): string {
      const fileType = getFileType(file);
      switch (fileType) {
        case "image":
          return file.url || `https://img.icons8.com/?size=100&id=bb0ziUL9UFYq&format=png&color=E42424`;
        case "pdf":
          return `https://img.icons8.com/?size=100&id=pdf--v1&format=png&color=E42424`;
        case "document":
          return `https://img.icons8.com/?size=100&id=doc--v1&format=png&color=E42424`;
        case "spreadsheet":
          return `https://img.icons8.com/?size=100&id=xls--v2&format=png&color=E42424`;
        default:
          return `https://img.icons8.com/?size=100&id=J6E9pYmAhHuk&format=png&color=E42424`;
      }
    }
    function getFileType(file: any): string {
      const extension = file.filename;
      if (extension === "pdf") {
        return "pdf";
      } else if (["doc", "docx", "txt"].includes(extension)) {
        return "document";
      } else if (["xls", "xlsx", "csv"].includes(extension)) {
        return "spreadsheet";
      } else if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
        return "image";
      } else {
        return "other";
      }
    }
}
      
       
        
