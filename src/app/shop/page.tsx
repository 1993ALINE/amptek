import { redirect } from "next/navigation";

// The storefront moved to the homepage. Keep /shop working for old links.
export default function ShopPage() {
  redirect("/");
}
