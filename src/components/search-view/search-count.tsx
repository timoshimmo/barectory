import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

interface Props {
  from: number;
  to: number;
  total: number;
}

const SearchCount = ({ from, to, total }: Props) => {
  const { t } = useTranslation('common');

  return (
    <div className="w-100">
      <span className="text-sm font-semibold text-heading">{`${t(
        'text-showing'
      )} ${from} - ${to} ${t('text-of')} ${total} ${t('text-products')}`}</span>
    </div>

  );
};

export default SearchCount;
