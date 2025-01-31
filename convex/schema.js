import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        picture: v.string(),
    }).index("by_email", ["email"]),
    emailTemplate: defineTable({
        tid: v.string(),
        design: v.any(), //save json data
        email: v.string(),
    }).index("by_tid", ["tid"])
        .index("by_email", ["email"]),
});