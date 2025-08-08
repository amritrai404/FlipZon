'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const products = [
    {
        title: 'Macbook Air',
        description:
            '15-inch Retina display for more of what you love in a slim design.',
        image: 'https://assets.stickpng.com/thumbs/5ec26e0b6c295800046c81db.png',
        bg: 'bg-black',
        text: 'text-white',
    },
    {
        title: 'PS4 Controller',
        description:
            'Powerful Controller that redefine your gaming experience.',
        image: 'https://assets.stickpng.com/thumbs/58f36427a4fa116215a923cf.png',
        bg: 'bg-black',
        text: 'text-white',
    },
    {
        title: 'Sony Headphones',
        description: 'Immersive audio experience with powerful computation.',
        image: 'https://assets.stickpng.com/thumbs/580b57fbd9996e24bc43bfbe.png',
        bg: 'bg-black',
        text: 'text-white',
    },
    {
        title: 'Apple Iphone 12',
        description: '15-inch Retina display (128GB Storage, Purple)',
        image: 'https://assets.stickpng.com/thumbs/61d2f93392b57c0004c64747.png',
        bg: 'bg-black',
        text: 'text-white',
    },
];

export default function ProductShowcase() {
    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
            {/* Text Section Above Products */}
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-extrabold mb-4">Featured Products</h2>
                <p className="text-lg text-gray-600 mb-2">
                    Discover our top picks for quality and value. Curated just for you.
                </p>
                <p className="text-gray-500">
                    At FlipZon, we bring you the latest gadgets and essentials at unbeatable prices. Check out our most popular products below.
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product, idx) => (
                    <div
                        key={idx}
                        className={`rounded-xl overflow-hidden md:mb-20 border-2 border-white hover:bg-white hover:text-black shadow-md transition-transform hover:scale-[1.01] ${product.bg} ${product.text} flex flex-col`}
                    >
                        <div className="p-6 flex flex-col justify-center flex-1">
                            <h3 className="text-2xl font-semibold mb-2">{product.title}</h3>
                            <p className="text-sm mb-4">{product.description}</p>
                        </div>

                        {product.image && (
                            <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-contain"
                                    sizes="(min-height: 208px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* View All Products Button */}
            <div className="mt-10 text-center">
                <Button
                    size="lg"
                    variant="ghost"
                    className="text-lg px-8 py-3 bg-white hover:bg-[#0066DA] text-black hover:text-white transition-colors shadow-md"
                >
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2"
                    >
                        <span>View all Products</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </Button>
            </div>
        </section>
    );
}
