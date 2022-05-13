import BakeryCategoryLoader from '@/components/ui/loaders/bakery-categories-loader';
import NotFound from '@/components/ui/not-found';
import SectionBlock from '@/components/ui/section-block';
import CategoryChildren from '@/components/ui/children-category';
import { Category } from '@/framework/types';
import { useTranslation } from 'react-i18next';

interface CategoriesRowProps {
  notFound: boolean;
  loading: boolean;
  categories: Category[];
}

const ChildrenRow: React.FC<CategoriesRowProps> = ({
  notFound,
  categories,
  loading,
}) => {

  const { t } = useTranslation('common');

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-full h-52 flex justify-center mt-[30px]">
          <BakeryCategoryLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {!notFound ? (
        <CategoryChildren items={categories} />
      ) : (
        <div className="min-h-full">
          <NotFound text="text-no-category" className="h-96" />
        </div>
      )}
    </div>
  );
};

export default ChildrenRow;
