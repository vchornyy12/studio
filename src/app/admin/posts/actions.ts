// src/app/admin/posts/actions.ts
"use server";

import { createSupabaseServerClient, getUser } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation"; // Not strictly needed if just revalidating

export async function deletePostAction(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const user = await getUser();

  if (!user) {
    return {
      success: false,
      message: "Authentication required.",
    };
  }

  const postId = formData.get("postId") as string;

  if (!postId) {
    return {
      success: false,
      message: "Post ID is missing.",
    };
  }

  // Optional: Further permission checks beyond RLS (e.g., ensure user owns post if not full admin)
  // const { data: postOwner } = await supabase.from('blog_posts').select('user_id').eq('id', postId).single();
  // if (!postOwner || postOwner.user_id !== user.id /* && !userIsAdminRole(user) */) {
  //   return {
  //     success: false,
  //     message: "You do not have permission to delete this post.",
  //   };
  // }

  const { error } = await supabase.from("blog_posts").delete().eq("id", postId); // CORRECTED TABLE NAME

  if (error) {
    console.error("Error deleting post:", error);
    return {
      success: false,
      message: `Failed to delete post: ${error.message}`,
    };
  }

  revalidatePath("/admin/posts"); // Revalidate the posts list page after deletion
  revalidatePath("/blog"); // Also revalidate public blog listing
  // No need to revalidate individual slug pages this way, they fetch on demand

  return {
    success: true,
    message: "Post deleted successfully.",
  };
}
