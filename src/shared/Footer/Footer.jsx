import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
    const footerLinks = {
        ourService: [
            { name: "Sell your number plate", href: "/sell-a-plate" },
            { name: "Buy a number plate", href: "/buy-a-plate" },
            { name: "Get a number plate valuation", href: "/userdashboard/get-plate-valued" }
        ],
        company: [
            { name: "About", href: "/about-us" },
            { name: "Contact Us", href: "/contact-us" }
        ],
        socialMedia: [
            { name: "Facebook", href: "https://facebook.com", external: true },
            { name: "Instagram", href: "https://instagram.com", external: true },
            { name: "Twitter", href: "https://twitter.com", external: true }
        ],
        resources: [
            { name: "Recently Sold", href: "/recently-sold" },
            { name: "Blog", href: "/guide-and-blog" },
            { name: "FAQ", href: "/faq" },
            { name: "Privacy Policy", href: "/privacy-policy" }
        ]
    }
    

    return (
        <footer className="bg-[#3C3D37] text-white">
            {/* Header Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">
                     The marketplace for private registrations.
                    </h2>

                    <div className="flex flex-row gap-2">
                        <Link
                          to="/sell-a-plate"
                          className="bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-full transition-colors duration-200 cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                          aria-label="Sell A Plate"
                        >
                            Sell A Plate
                        </Link>
                        <Link
                          to="/buy-a-plate"
                          className="border-2 border-white bg-white hover:bg-gray-100 active:bg-white text-gray-900 font-semibold px-6 py-2 rounded-full transition-colors duration-200 cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                          aria-label="Buy A Plate"
                        >
                            Buy A Plate
                        </Link>
                       
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-600 mb-8"></div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 mb-8">
                    {/* Description */}
                    <div className="lg:col-span-2">
                        <p className="text-gray-300 leading-relaxed">
                           We connect sellers with buyers on a secure, premium platform.
                        </p>
                    </div>

                     <div className="lg:col-span-2">
                    </div>

                    {/* Our Service */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Our Service</h3>
                        <ul className="space-y-2">
                            {footerLinks.ourService.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media*/}
                    <div className="space-y-6">
                        {/* Social Media */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">Social Media</h3>
                            <ul className="space-y-2">
                                {footerLinks.socialMedia.map((link, index) => (
                                    <li key={index}>
                                        {link.external ? (
                                          <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                                          >
                                            {link.name}
                                          </a>
                                        ) : (
                                          <Link
                                            to={link.href}
                                            className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                                          >
                                            {link.name}
                                          </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                      
                    </div>

                      {/* Resources */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">Resources</h3>
                            <ul className="space-y-2">
                                {footerLinks.resources.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                </div>

                {/* Bottom Divider */}
                <div className="w-full h-px bg-gray-600 mb-6"></div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-yellow-500 text-sm">
                        © 2025 Plate {} Exchange. Company number: 0245645
                    </p>
                </div>
            </div>
        </footer>
    )
}
