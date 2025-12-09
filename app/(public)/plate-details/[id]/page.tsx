import PlateDetails from "@/components/pages/plate-details"

interface PlateDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function PlateDetailsPage({ params }: PlateDetailsPageProps) {
  const { id } = await params
  return <PlateDetails id={id} />
}
