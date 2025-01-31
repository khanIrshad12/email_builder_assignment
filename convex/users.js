import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user exists using email index
    const existingUser = await ctx.db.query("users")
      .withIndex("by_email", q => q.eq("email", args.email))
      .unique();

    if (!existingUser) {
      // Create new user if doesn't exist
      const userId = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        picture: args.picture
      });
      return userId;
    }
    
    // Return existing user ID
    return existingUser._id;
  }
});