import BakeryCategoryLoader from '@/components/ui/loaders/bakery-categories-loader';
import NotFound from '@/components/ui/not-found';
import SectionBlock from '@/components/ui/section-block';
import CategoryRow from '@/components/ui/row-category';
import { Category } from '@/framework/types';

interface CategoriesRowProps {
  notFound: boolean;
  loading: boolean;
  categories: Category[];
}

const CategoriesRow: React.FC<CategoriesRowProps> = ({
  notFound,
  categories,
  loading,
}) => {
  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-full h-52 flex justify-center mt-[20px] px-2">
          <BakeryCategoryLoader />
        </div>
      </div>
    );
  }

  return (
    <SectionBlock>
      {!notFound ? (
        <CategoryRow items={categories} />
      ) : (
        <div className="min-h-full">
          <NotFound text="text-no-category" className="h-96" />
        </div>
      )}
    </SectionBlock>
  );
};

export default CategoriesRow;
