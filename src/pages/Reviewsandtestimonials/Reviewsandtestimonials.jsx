import React from "react";
import ReviewCard from "../../shared/ReviewCard/ReviewCard";

export default function Reviewsandtestimonials() {
const reviews = [
  {
    name: "Sophia Martinez",
    reviewHeadings: "Highly recommended",
    rating: 5,
    review: "Incredible experience! I listed my plate on PlateExchange and it sold within 48 hours. The process was smooth and completely hassle-free.",
    date: "3 days ago",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Oliver Brown",
    reviewHeadings: "Very satisfied",
    rating: 5,
    review: "Honestly the easiest platform I’ve ever used to sell a plate. No hidden costs, direct buyer contact, and quick payment. Couldn’t ask for more!",
    date: "1 week ago",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Chloe Anderson",
    reviewHeadings: "Great platform",
    rating: 4,
    review: "Bought my dream plate for far less than dealer prices. The secure payment system gave me confidence in the transaction.",
    date: "2 weeks ago",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Daniel Carter",
    reviewHeadings: "Quick and easy",
    rating: 5,
    review: "I was surprised at how quickly I found a buyer. The flat £10 fee is a bargain compared to what others charge.",
    date: "3 weeks ago",
    image: "https://randomuser.me/api/portraits/men/56.jpg"
  },
  {
    name: "Amelia Wright",
    reviewHeadings: "Fantastic support",
    rating: 5,
    review: "The support team guided me through every step. My plate sold in less than a week, stress-free!",
    date: "1 month ago",
    image: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    name: "Liam Evans",
    reviewHeadings: "Game changer",
    rating: 5,
    review: "PlateExchange is a game changer. Faster, cheaper, and more transparent than other marketplaces I’ve tried.",
    date: "1 month ago",
    image: "https://randomuser.me/api/portraits/men/76.jpg"
  },
  {
    name: "Grace Patel",
    reviewHeadings: "Smooth process",
    rating: 4,
    review: "Listing my plate was straightforward. Took a little longer to sell, but I still saved a lot in fees.",
    date: "2 months ago",
    image: "https://randomuser.me/api/portraits/women/47.jpg"
  },
  {
    name: "Ethan Walker",
    reviewHeadings: "Excellent value",
    rating: 5,
    review: "The flat £10 fee saved me hundreds compared to commission-based sites. Excellent value for money.",
    date: "2 months ago",
    image: "https://randomuser.me/api/portraits/men/21.jpg"
  },
  {
    name: "Hannah Lewis",
    reviewHeadings: "Trustworthy service",
    rating: 5,
    review: "I felt secure dealing directly with the buyer. Everything was transparent and quick. Would happily use again.",
    date: "3 months ago",
    image: "https://randomuser.me/api/portraits/women/29.jpg"
  },
  {
    name: "Jack Robinson",
    reviewHeadings: "Couldn’t be easier",
    rating: 5,
    review: "From creating the listing to receiving payment, the entire process was seamless. Highly impressed.",
    date: "3 months ago",
    image: "https://randomuser.me/api/portraits/men/19.jpg"
  },
  // --- Extra 8 below ---
  {
    name: "Isabella Hughes",
    reviewHeadings: "User friendly",
    rating: 5,
    review: "The interface is so simple, even for someone like me who’s not tech-savvy. Sold my plate without stress.",
    date: "4 months ago",
    image: "https://randomuser.me/api/portraits/women/53.jpg"
  },
  {
    name: "Mason Clark",
    reviewHeadings: "Worth every penny",
    rating: 5,
    review: "That one-time £10 fee is unbeatable. Sold my plate for a great price and kept all the profit.",
    date: "4 months ago",
    image: "https://randomuser.me/api/portraits/men/42.jpg"
  },
  {
    name: "Ella Scott",
    reviewHeadings: "Super reliable",
    rating: 4,
    review: "Transaction was smooth and the buyer was verified. Took about two weeks but still happy with the result.",
    date: "5 months ago",
    image: "https://randomuser.me/api/portraits/women/25.jpg"
  },
  {
    name: "Noah Turner",
    reviewHeadings: "Fast payout",
    rating: 5,
    review: "What impressed me most was how fast the payment arrived after the sale. Completely stress-free process.",
    date: "5 months ago",
    image: "https://randomuser.me/api/portraits/men/61.jpg"
  },
  {
    name: "Mia Edwards",
    reviewHeadings: "Fantastic community",
    rating: 5,
    review: "I love how easy it is to connect directly with genuine buyers. Felt more personal and safe than other sites.",
    date: "6 months ago",
    image: "https://randomuser.me/api/portraits/women/36.jpg"
  },
  {
    name: "James Foster",
    reviewHeadings: "Straightforward",
    rating: 5,
    review: "The entire process was clear and straightforward. I’ll definitely recommend PlateExchange to friends.",
    date: "6 months ago",
    image: "https://randomuser.me/api/portraits/men/48.jpg"
  },
  {
    name: "Emily King",
    reviewHeadings: "Affordable and fair",
    rating: 5,
    review: "Most platforms charge ridiculous fees, but this one is affordable and fair. Sold my plate quickly too!",
    date: "7 months ago",
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Benjamin Hall",
    reviewHeadings: "Best marketplace",
    rating: 5,
    review: "Hands down the best marketplace for plates. Direct, affordable, and efficient. My go-to from now on.",
    date: "7 months ago",
    image: "https://randomuser.me/api/portraits/men/37.jpg"
  }
];



  return (
    <div className="container mx-auto px-5 md:px-0 py-10 md:py-16">
      {/* Header */}
      <div className="text-center my-12">
        <h1 className="text-3xl md:text-6xl font-medium text-gray-900 mb-6">
          Reviews
        </h1>
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Hear what our happy users have to say about their PlateXpress experience.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r, index) => (
          <ReviewCard key={index} {...r} />
        ))}
      </div>
    </div>
  );
}
