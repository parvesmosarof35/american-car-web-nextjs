import BlogDetails from "@/components/pages/guide-and-blog/blog-details"

interface BlogDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { id } = await params
  return <BlogDetails id={id} />
}
