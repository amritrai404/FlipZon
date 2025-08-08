'use client';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

type Props = { product: Product; slug: string };

const ProductCard: React.FC<Props> = ({ product, slug }) => (
  <Link href={`/products/${slug}`}>
    <div className="rounded-xl bg-white py-4 shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center cursor-pointer">
      <div className="w-40 h-40 relative">
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: 'contain' }}
          sizes="160px"
          priority={false}
        />
      </div>
      <h3 className="text-lg font-medium mt-2">{product.title}</h3>
      <p className="text-sm">{product.description}</p>
      <p className="text-lg font-bold mt-1">₹{product.price}</p>
    </div>
  </Link>
);

export default ProductCard;
