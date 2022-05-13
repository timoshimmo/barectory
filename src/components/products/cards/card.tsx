import { Product } from '@/framework/types';
import dynamic from 'next/dynamic';
const Helium = dynamic(() => import('@/components/products/cards/helium'));
const Neon = dynamic(() => import('@/components/products/cards/neon')); 
const Argon = dynamic(() => import('@/components/products/cards/argon'));
const Krypton = dynamic(
  () => import('@/components/products/cards/krypton')
);
const Xenon = dynamic(() => import('@/components/products/cards/xenon'));
const Radon = dynamic(() => import('@/components/products/cards/radon'));

const MAP_PRODUCT_TO_CARD: Record<string, any> = {
  neon: Neon,
  helium: Helium,
  argon: Argon,
  krypton: Krypton,
  xenon: Xenon,
  radon: Radon,
};

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  ...props
}) => {
  const Component = product?.type?.settings?.productCard
    ? MAP_PRODUCT_TO_CARD[product?.type?.settings?.productCard]
    : Neon;
  return <Component product={product} {...props} className={className} />;
};
export default ProductCard;
