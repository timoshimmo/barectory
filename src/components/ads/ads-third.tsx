import { useType } from '@/framework/type';
import dynamic from 'next/dynamic';
const ErrorMessage = dynamic(() => import('@/components/ui/error-message'));
const AdsShortThird = dynamic(() => import('@/components/ads/ads-short-third'));

const MAP_ADS_TO_GROUP: Record<string, any> = {
  classic: AdsShortThird,
  modern: AdsShortThird,
  minimal: AdsShortThird,
  standard: AdsShortThird,
  compact: AdsShortThird,
  default: AdsShortThird,
};

const AdsThird: React.FC<{ layout: string; variables: any }> = ({
  layout,
  variables,
}) => {
  const { type, error } = useType(variables.type);
  if (error) return <ErrorMessage message={error.message} />;
  const Component = MAP_ADS_TO_GROUP[layout];
  return (
    <Component ads={type?.promotional_sliders} layout={layout} slug={type?.slug} />
  );
};

export default AdsThird;
