import { redirect } from "next/navigation";
import { APPLY_URL } from "@/lib/links";

// Kept so old links, ads, and bookmarks to /apply still land in the
// funnel. On-site buttons link to APPLY_URL directly (no extra hop).
export default function ApplyPage() {
  redirect(APPLY_URL);
}
