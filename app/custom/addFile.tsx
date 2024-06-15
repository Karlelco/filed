"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { newFile } from "@/convex/myFunctions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const FormSchema = z.object({
  filename: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  file: z.instanceof(File),
});

function NewFile() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        filename: "",
        file: undefined
    },
  });
  const generateUploadUrl = useMutation(api.myFunctions.generateUploadUrl);
  const newFile = useMutation(api.myFunctions.newFile)
  const { user } = useKindeBrowserClient();
  

   async function onSubmit(data: z.infer<typeof FormSchema>) {
      console.log(data);

        const postUrl = await generateUploadUrl();
      
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": data.file!.type },
          body: data.file,
        });
   try {
     if (!user) {
      return
     }
       const { storageId } = await result.json();
     await newFile({
       directory: user?.id as unknown as string,
       filename: data.filename,
       storageId,
     })
   } catch (error) {
    
   }
     
     form.reset()
     

    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }

return (
  <>
    <main>
      <AlertDialog >
        <AlertDialogTrigger asChild>
          <Button variant="outline">Add File</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-full px-2 space-y-4 items-center justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="filename"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Name</FormLabel>
                    <FormControl>
                      <Input placeholder="File Name" {...field} />
                    </FormControl>
                    <FormDescription>This is your file name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Pdf, Image, Docx .etc"
                        onChange={(e) => {
                          if (!e.target.files) {
                            return;
                          }

                          onChange(e.target.files[0]);
                        }}
                      />
                    </FormControl>
                    <FormDescription>This is your public file.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">Submit</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  </>
);
}

export default NewFile;