interface BrandLogoProps {
  img?: string
  status: string
  information: string
}

export default function BrandLogo({ img, status, information }: BrandLogoProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {img && <img src={img || "/placeholder.svg"} alt={status} />}
      <h1 className="text-2xl font-semibold">{status}</h1>
      <p className="text-sm text-gray-800">{information}</p>
    </div>
  )
}
