
import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";



//adding a new file to convex
export const newFile = mutation({
  args: {
    directory: v.string(),
    filename: v.string(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("files", {
      directory: args.directory,
      filename: args.filename,
      storageId: args.storageId,
      
    });
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});


export const getMetadata = query({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.system.get(args.storageId);
  },
});

//fetch files by directoryId
export const getFilesByDirectoryId = query({
  args: {
    directoryId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = args.directoryId;
    const files = await ctx.db.query("files").withIndex("directoryId", (q) => q.eq("directory", user)).collect();
     return Promise.all(
       files.map(async (files) => ({
         ...files,
         // If the message is an "image" its `body` is an `Id<"_storage">`
         ...(await ctx.db.system.query("_storage").collect()
           ? { url: await ctx.storage.getUrl(files.storageId), type: await ctx.storage.getMetadata(files.storageId) }
           : {}),
       }))
     );
  },
});

export const listAllFiles = query({
  handler: async (ctx) => {
    return await ctx.db.system.query("_storage").collect();
  },
});

//listFilesByUser
// export const listFilesByUser = query({
//   args: {
//     userId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const user = args.userId;
//     const files = await ctx.db.query("files").withIndex("userId", (q) => q.eq("directory", user)).collect();
//      return Promise.all(
//        files.map(async (files) => ({
//          ...files,
//          // If the message is an "image" its `body` is an `Id<"_storage">`
//          ...(await ctx.db.system.query("_storage").collect()
//            ? { url: await ctx.storage.getUrl(files.storageId), type: await ctx.storage.getMetadata(files.storageId) }
//            : {}),
//        }))
//      );
//   },
// });