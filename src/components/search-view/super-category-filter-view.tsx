import CheckboxGroup from './checkbox-group';
import { useState, useEffect, useMemo } from 'react';
import Checkbox from '@/components/ui/forms/checkbox/checkbox';
import { useRouter } from 'next/router';
import Scrollbar from '@/components/ui/scrollbar';
import { useTranslation } from 'react-i18next';
import { useCategories } from '@/framework/category';
import ErrorMessage from '@/components/ui/error-message';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { useCategory } from '@/framework/category';

interface Props {
  categories: any[];
}

const SuperCategoryFilterView = ({ categories }: Props) => {
  const { t } = useTranslation('common');

  const router = useRouter();
  const selectedValues = useMemo(
    () =>
      router.query.category ? (router.query.category as string).split(',') : [],
    [router.query.category]
  );
  const [state, setState] = useState<string[]>(() => selectedValues);
  useEffect(() => {
    setState(selectedValues);
    console.log("CATEGORIES: " + JSON.stringify(categories));
  }, [selectedValues]);

  function handleChange(values: string[]) {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        category: values.join(','),
      },
    });
  }

  return (
    <div className="relative -mb-5 after:absolute after:bottom-0 after:flex after:h-6 after:w-full after:bg-gradient-to-t after:from-white ltr:after:left-0 rtl:after:right-0">
      <Scrollbar style={{ maxHeight: '400px' }} className="pb-6">
        <span className="sr-only">{t('text-categories')}</span>
        <div className="grid grid-cols-1 gap-4">
          <CheckboxGroup values={state} onChange={handleChange}>
            {categories.children.map((plan) => (
              <Checkbox
                key={plan.id}
                label={plan.name}
                name={plan.slug}
                value={plan.slug}
                theme="secondary"
              />
            ))}
          </CheckboxGroup>
        </div>
      </Scrollbar>
    </div>
  );
};

const SuperCategoryFilter: React.FC<{ slug?: string }> = ({ slug }) => {
  const { query } = useRouter();
/*  const { categories, isLoading, error } = useCategories({
    ...(type ? { type } : { type: query.searchType }),
    limit: 1000
  });*/

  const { category, iscLoading, cerror } = useCategory({ slug: slug });

  if (cerror) return <ErrorMessage message={cerror.message} />;
  if (iscLoading)
    return (
      <div className="flex w-full items-center justify-center py-5">
        <Spinner className="h-6 w-6" simple={true} />
      </div>
    );
  return <SuperCategoryFilterView categories={category} />;
};

export default SuperCategoryFilter;
