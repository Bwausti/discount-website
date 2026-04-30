import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ brandId: string }>;
}

export default async function BrandRedirectPage({ params }: PageProps) {
  const { brandId } = await params;
  redirect(`/collections/${brandId}`);
}
