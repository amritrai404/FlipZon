'use client';

import Image from 'next/image';
import { Product } from '@/types';
import Link from 'next/link';
import PriceDisplay from '@/utils/PriceDisplay'

type Props = {
  product: Product;
  slug: string
};

const ProductCard: React.FC<Props> = ({ product, slug }) => {
  return (

<Link href={`/products/${slug}`}>
    <div className="rounded-xl bg-white py-0 h-100 shadow-md hover:shadow-lg hover:shadow-black/40  transition p-4 relative flex flex-col items-center justify-center text-center space-y-6">
      {/* Product Image */}
        <div className="w-40 h-40 relative">
          <Image
            src={product.image}
            alt={product.title}
            fill

            className="object-contain "
            sizes="(max-width: 800px) 100vw, 20vw"
            priority
          />
        </div>

      {/* Product Title */}
      <h3 className="text-lg font-medium">{product.title}</h3>

      {/* Product Description */}
      <p className="text-sm">{product.description}</p>

      {/* Product Price */}
      <p className="text-lg font-bold"><PriceDisplay amount={product.price}/></p>
    </div>
  </Link>

  );
};

export default ProductCard;
