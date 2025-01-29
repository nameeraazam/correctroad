import Image from 'next/image';
import Link from 'next/link'; // Import Link for navigation
import { Heart, Share2, LayoutGrid } from 'lucide-react';
import { Product } from '../types/product';
import { urlFor } from '@/sanity/lib/image';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString()}`;
  };

  // Ensure that product.productImage is not undefined or null before trying to use it
  const imageUrl = product.productImage ? urlFor(product.productImage).url() : '/path/to/default-image.jpg'; // Fallback image

  // Use a fallback alt text if product.title is missing or undefined
  const altText = product.title || 'Product image'; // Fallback alt text

  console.log('Image URL:', imageUrl); // Log to verify the image URL is correct

  return (
    <Link href="/product">
      <div className="group relative flex flex-col">
        <div className="relative aspect-square w-[95%] overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={imageUrl}
            alt={altText}  // Use the altText variable here
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            priority // Optional: if you want to load the image with higher priority
            />
           
          <div className="absolute inset-x-0 bottom-0 bg-white/75 p-4 opacity-0 transition-opacity-50 group-hover:opacity-100">
            <button className="w-full rounded bg-black py-2 text-sm font-medium text-white hover:bg-black/90">
              Add to cart
            </button>
            <div className="mt-2 flex items-center justify-center gap-4 text-sm text-gray-700">
              <button className="flex items-center gap-1 hover:text-black">
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button className="flex items-center gap-1 hover:text-black">
                <LayoutGrid className="h-4 w-4" />
                Compare
              </button>
              <button className="flex items-center gap-1 hover:text-black">
                <Heart className="h-4 w-4" />
                Like
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-medium">{formatPrice(product.price)}</span>
            {product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;



