export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>

      <div className="mt-5 text-center">
        <h1 className="text-2xl font-bold text-gray-700">
          Loading <span className="text-blue-500">...</span>
        </h1>
        <p className="text-gray-500 animate-pulse">Please wait...</p>
      </div>
    </div>
  )
}
