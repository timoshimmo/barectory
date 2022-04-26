import Logo from '@/components/ui/logo';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';
import { CloseIcon } from '@/components/icons/close-icon';
import { useTranslation } from 'next-i18next';
import { MapPin } from '@/components/icons/map-pin';

const DrawerWrapper: React.FC = ({ children }) => {
  const { t } = useTranslation('common');
  const [_, closeSidebar] = useAtom(drawerAtom);
  return (
    <div className="flex h-full flex-col">
      <div className="fixed top-0 z-20 mb-4 flex w-80 max-w-80 items-center justify-between border-b border-border-200 border-opacity-75 bg-accent p-5 md:mb-6">
        <Logo className="w-24 md:w-auto" />
        <button
           className="product-cart relative hover:text-underline flex items-center justify-start border border-light rounded px-1 py-1"
         >
           <MapPin className="w-4 h-3 text-light" />
           <span className="flex text-light" style={{ fontSize: 10+ 'px' }}>
             CHANGE LOCATION
             </span>
         </button>
        <button
          onClick={() => closeSidebar({ display: false, view: '' })}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-body transition-all duration-200 hover:bg-accent hover:text-light focus:bg-accent focus:text-light focus:outline-none"
        >
          <span className="sr-only">{t('text-close')}</span>
          <CloseIcon className="h-2.5 w-2.5" />
        </button>
      </div>
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default DrawerWrapper;
