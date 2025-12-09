import { ArrowRight } from 'lucide-react';
import React from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../config/envConfig';
export default function BlogCard({ article }) {
    // console.log(getImageUrl(article.image), "this is blog img")
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Article Image */}
            <div className="aspect-video overflow-hidden">
                <img
                    src={getImageUrl(article.image) || "/placeholder.svg"}
                    alt="Article thumbnail"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Article Content */}
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 leading-tight line-clamp-2">
                    {article.title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {article.description}
                </p>

                {/* Read Article Link */}
                  <Link
          to={`/blog/details/${article.id}`}
          className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-gray-700 transition-colors duration-200 group"
        >
          Read Article
          <MdOutlineArrowOutward className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
            </div>
        </div>
    );
}
