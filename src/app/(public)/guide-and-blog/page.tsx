export default function GuideAndBlogPage() {
  return (
    <div className="container mx-auto px-5 md:px-0 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          Guide & Blog
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How to Buy Number Plates
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Buying a private number plate is easier than you might think.
              Follow these simple steps to find your perfect plate:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Browse our extensive collection of available plates</li>
              <li>Use the search function to find specific combinations</li>
              <li>Contact sellers directly to negotiate prices</li>
              <li>Complete the transfer process through DVLA</li>
            </ol>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How to Sell Number Plates
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>Ready to sell your private plate? Here's how to get started:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>List your plate on our platform</li>
              <li>Set your asking price</li>
              <li>Respond to buyer enquiries</li>
              <li>Complete the sale securely</li>
            </ol>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Number Plate Valuation
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>Understanding the value of your number plate:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Age-related plates vs dateless plates</li>
              <li>Shorter registrations are typically more valuable</li>
              <li>Popular combinations and names command premium prices</li>
              <li>Condition and transfer history affect value</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Legal Requirements
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>Important legal information about number plates:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All plates must meet DVLA regulations</li>
              <li>Proper documentation required for transfers</li>
              <li>Age-appropriate plate formats</li>
              <li>Display requirements and restrictions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
