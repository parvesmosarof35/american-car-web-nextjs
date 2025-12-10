export default function ReviewsPage() {
  return (
    <div className="container mx-auto px-5 md:px-0 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          Customer Reviews & Testimonials
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="ml-3 text-2xl font-semibold text-gray-800">
              4.9 out of 5
            </span>
          </div>
          <p className="text-gray-600 mb-4">Based on 2,847 customer reviews</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-gray-600 font-semibold">JD</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">John Davies</h3>
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              "Excellent service from start to finish. Found the perfect plate
              for my car and the transfer process was smooth. Highly recommend!"
            </p>
            <p className="text-sm text-gray-500 mt-2">2 days ago</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-gray-600 font-semibold">SM</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Sarah Mitchell</h3>
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              "Great platform for buying and selling number plates. Sold my
              plate within a week at a good price. Much better than dealing with
              dealers."
            </p>
            <p className="text-sm text-gray-500 mt-2">1 week ago</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-gray-600 font-semibold">MR</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Mike Roberts</h3>
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <svg className="w-4 h-4 text-gray-300" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              "Very easy to use website with lots of options. Found exactly what
              I was looking for. The only minor issue was the transfer took a
              bit longer than expected."
            </p>
            <p className="text-sm text-gray-500 mt-2">2 weeks ago</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-gray-600 font-semibold">EC</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Emma Collins</h3>
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              "Fantastic experience! The platform made it so easy to connect
              with sellers directly. Saved money compared to dealer prices. Will
              definitely use again."
            </p>
            <p className="text-sm text-gray-500 mt-2">3 weeks ago</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mt-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Share Your Experience
          </h2>
          <p className="text-gray-600 mb-6">
            Have you bought or sold a number plate through our platform? We'd
            love to hear your feedback!
          </p>
          <button className="bg-[#00823A] text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors">
            Leave a Review
          </button>
        </div>
      </div>
    </div>
  );
}
