import SearchBox from '@/components/ui/search/search-box';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import AutoSuggestionBox from '@/components/search-view/suggestion';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { ROUTES } from '@/lib/routes';

interface Props {
  label: string;
  className?: string;
  variant?: 'minimal' | 'normal' | 'with-shadow';
  seeMore?: boolean;
  [key: string]: unknown;
}

const SearchWithSuggestion: React.FC<Props> = ({
  label,
  className,
  seeMore = false,
  variant,
  ...props
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [searchTerm, updateSearchTerm] = useState('');

  const handleOnChange = (e: any) => {
    const { value: inputValue } = e.target;
    updateSearchTerm(inputValue);
  };

  const onSearch = (e: any) => {
    e.preventDefault();
    if (!searchTerm) return;
  };

  function clearSearch() {
    updateSearchTerm('');
  }

  const onSearchMore = (e: any) => {
    e.preventDefault();
    if (!searchTerm) return;
    const { asPath, query } = router;
    const { pages, ...restQuery } = query;
    router.push(
      {
        pathname: asPath + ROUTES.SEARCH,
        query: { ...restQuery, text: searchTerm },
      },
      undefined,
      {
        scroll: false,
      }
    );
  };
  return (
    <div className={cn('w-full relative z-[1000]', className)}>
      <SearchBox
        label={label}
        onSubmit={onSearchMore}
        onClearSearch={clearSearch}
        onChange={handleOnChange}
        value={searchTerm}
        name="search"
        placeholder="Search"
        variant={variant}
        {...props}
      />

      <AutoSuggestionBox
        searchQuery={searchTerm}
        visible={Boolean(searchTerm.length > 0)}
        seeMoreLink={onSearchMore}
        seeMore={seeMore}
      />
    </div>
  );
};

export default SearchWithSuggestion;
