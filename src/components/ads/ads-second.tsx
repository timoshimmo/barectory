import { useType } from '@/framework/type';
import dynamic from 'next/dynamic';
const ErrorMessage = dynamic(() => import('@/components/ui/error-message'));
const AdsShortSecond = dynamic(() => import('@/components/ads/ads-short-second'));

const MAP_ADS_TO_GROUP: Record<string, any> = {
  classic: AdsShortSecond,
  modern: AdsShortSecond,
  minimal: AdsShortSecond,
  standard: AdsShortSecond,
  compact: AdsShortSecond,
  default: AdsShortSecond,
};

const AdsSecond: React.FC<{ layout: string; variables: any }> = ({
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

export default AdsSecond;
