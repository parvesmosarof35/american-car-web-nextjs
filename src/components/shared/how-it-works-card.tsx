"use client"

interface HowItWorksCardProps {
  title: string
  description: string
  buttonText: string
  onClick?: () => void
}

export default function HowItWorksCard({ title, description, buttonText, onClick }: HowItWorksCardProps) {
  const handleClick = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      if (typeof window !== "undefined") window.scrollTo(0, 0)
    }
    if (onClick) onClick()
  }

  return (
    <div className="rounded-lg shadow-md overflow-hidden max-w-md mx-5 my-5 border border-gray-200 bg-white flex flex-col">
      <div className="p-6 flex-grow">
        <h2 className="text-[#5587A7] text-2xl font-bold mb-4">{title}</h2>
        <p className="text-[rgb(27,27,27)] mb-6 leading-relaxed">{description}</p>
      </div>

      <div className="bg-[#f5f5f5] p-5 flex justify-center">
        <button
          type="button"
          onClick={handleClick}
          className="bg-[#00823A] hover:bg-[#006c30] active:bg-[#005527] text-white font-dmsans py-3 px-6 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00823A] cursor-pointer"
          aria-label={buttonText}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}
