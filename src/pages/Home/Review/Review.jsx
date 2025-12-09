import React from 'react';
import ReviewCard from '../../../shared/ReviewCard/ReviewCard';

export default function Review() {
const testimonials = [
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
    review: "Great platform! Bought my dream plate for far less than dealer prices. The secure payment system gave me confidence in the transaction.",
    date: "2 weeks ago",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Daniel Carter",
    reviewHeadings: "Highly recommended",
    rating: 5,
    review: "I was surprised at how quickly I found a buyer. The flat £10 fee is a bargain compared to what others charge. Highly recommend to sellers!",
    date: "3 weeks ago",
    image: "https://randomuser.me/api/portraits/men/56.jpg"
  },
  {
    name: "Amelia Wright",
    reviewHeadings: "Fantastic support",
    rating: 5,
    review: "Fantastic support team! They guided me through the steps and made sure my listing was visible. My plate sold in less than a week.",
    date: "1 month ago",
    image: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    name: "Liam Evans",
    reviewHeadings: "Game changer",
    rating: 5,
    review: "PlateExchange is a game changer. I’ve used other sites before, but this was faster, cheaper, and more transparent. Will definitely use again!",
    date: "1 month ago",
    image: "https://randomuser.me/api/portraits/men/76.jpg"
  }
];




  return (
    <section className="px-5 md:px-0 py-5 md:py-16 overflow-hidden my-10 z-10 bg-white">
      <div className="container mx-auto">

        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="text-xl md:text-6xl font-medium flex items-center justify-center gap-2 flex-wrap">
            Rated 'Excellent' on
            <img
              src="https://i.ibb.co.com/NnC9MC0B/image.png"
              alt="Trustpilot logo"
              className="inline-block h-8 md:h-10"
            />
            Trustpilot
          </h2>
        </div>

        {/* Marquee Container */}
        <section className="relative overflow-hidden mt-10" >
          <div className="marquee-container">
            <div className="marquee-content">
              {/* First set of testimonials */}
              {testimonials.map((t, i) => (
                <div key={`first-${i}`} className="marquee-item">
                  <ReviewCard {...t} />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {testimonials.map((t, i) => (
                <div key={`second-${i}`} className="marquee-item">
                  <ReviewCard {...t} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
