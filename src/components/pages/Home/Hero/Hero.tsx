import Image from "next/image";
import HeroSearch from "./HeroSearch";
import LikeIconAndText from "@/components/shared/like-icon-text";

const features = [
  { imgSrc: "/1.png", text: "We charge only £10." },
  { imgSrc: "/2.svg", text: "No middleman (save up to 30%)." },
  { imgSrc: "/3.svg", text: "Buyer and Seller deal directly with each other." },
];

export default function Hero() {
  return (
    <main className="container mx-auto px-5 md:px-0 pb-16 pt-16 md:pt-24">
      {/* Hero text */}
      <section className="text-center mb-16 text-4xl md:text-6xl font-semibold">
        <h1 className="text-gray-800 mb-2 leading-tight">
          Connecting buyers and sellers of
        </h1>
        <h2 className="text-gray-800 mb-8">
          <span className="text-custom-yellow  px-2 py-1 rounded relative">
            Number Plates{" "}
            <Image
              className="absolute -bottom-3 right-0"
              src="https://i.ibb.co.com/4Z8jPdts/image.png"
              alt="yellow-line"
              width={500}
              height={150}
            />
          </span>{" "}
          <span className="md:inline block mt-10">directly.</span>
        </h2>
      </section>

      {/* Search box - Client component */}
      <HeroSearch />

      <section className="grid md:grid-cols-3 gap-10 max-w-9xl mx-auto mt-10">
        {features.map((feature, index) => (
          <LikeIconAndText
            key={index}
            imgSrc={feature.imgSrc}
            text={feature.text}
          />
        ))}
      </section>
    </main>
  );
}
