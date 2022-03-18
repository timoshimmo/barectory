import { useTranslation } from 'react-i18next';
import Link from '@/components/ui/link';
import { ROUTES } from '@/lib/routes';

interface Props {
  from: number;
  to: number;
  total: number;
}

const SearchCount = ({ from, to, total }: Props) => {
  const { t } = useTranslation('common');

  return (
    <div className="w-100">
      <div className="flex mb-2">
        <Link
          className="text-sm text-heading"
          href={`${ROUTES.HOME}`}
        >
          Home
        </Link>
        <span className="text-sm text-heading ml-2 mr-2 font-semibold"> > </span>
        <span className="text-sm text-heading font-semibold">Products</span>
      </div>
      <span className="text-sm font-semibold text-heading">{`${t(
        'text-showing'
      )} ${from} - ${to} ${t('text-of')} ${total} ${t('text-products')}`}</span>
    </div>

  );
};

export default SearchCount;
