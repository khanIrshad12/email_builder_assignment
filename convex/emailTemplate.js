import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const SaveTemplate = mutation({
    args: {
        tid: v.string(),
        design: v.any(), //save json data
        email: v.string(),
    },
    handler: async (ctx, args) => {
        console.log("args", args);
        
        try {
            const result = await ctx.db.insert("emailTemplate", {
                tid: args.tid,
                design: args.design,//json format
                email: args.email
            });
           
            console.log("result", result);
            
            return result
        } catch (e) {
            console.log(e);
        }
    }
})

export const GetTemplateByTid = query({
    args: { tid: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("emailTemplate")
            .withIndex("by_tid", q => q.eq("tid", args.tid))
            .unique();
    },
});

export const GetTemplateByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("emailTemplate")
            .withIndex("by_email", q => q.eq("email", args.email))
            .collect();
    },
})

export const UpdateTemplate = mutation({
    args: {
        tid: v.string(),
        design: v.any(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("emailTemplate")
            .withIndex("by_tid", q => q.eq("tid", args.tid))
            .unique();

        if (!existing) {
            throw new Error("Template not found");
        }

        await ctx.db.patch(existing._id, {
            design: args.design
        });
    },
});