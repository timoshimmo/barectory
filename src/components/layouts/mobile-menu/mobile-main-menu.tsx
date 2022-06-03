import { useRouter } from 'next/router';
import { ROUTES } from '@/lib/routes';
import { useTranslation } from 'next-i18next';
import DrawerWrapper from '@/components/ui/drawer/drawer-wrapper';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';

const headerLinks = [
  { href: ROUTES.OFFERS, label: 'nav-menu-offer' },
  { href: ROUTES.ABOUT, label: 'About' },
  { href: ROUTES.BLOGS, label: 'Blog' },
  { href: ROUTES.CONTACT, label: 'nav-menu-contact' },
];

export default function MobileMainMenu() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [_, closeSidebar] = useAtom(drawerAtom);

  function handleClick(path: string) {
    router.push(path);
    closeSidebar({ display: false, view: '' });
  }

  return (
    <DrawerWrapper>
      <ul className="flex-grow">
        <li>
          <button
            onClick={() => handleClick(ROUTES.HOME)}
            className="flex items-center py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent cursor-pointer"
          >
            Home
          </button>
        </li>
        <hr />
        <ul className="py-2">
          <li>
            <span className="py-3 px-5 md:px-8 text-sm font-bold capitalize text-heading text-accent">
              Categories
            </span>
          </li>
          <li>
            <button
              onClick={() => handleClick(`${ROUTES.CATEGORIES}/beer`)}
              className="flex items-center py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent cursor-pointer"
            >
              Beer
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick(`${ROUTES.CATEGORIES}/spirits`)}
              className="flex items-center py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent cursor-pointer"
            >
              Spirits
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick(`${ROUTES.CATEGORIES}/wines`)}
              className="flex items-center py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent cursor-pointer"
            >
              Wines
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick(`${ROUTES.CATEGORIES}/ready-to-drink`)}
              className="flex items-center py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent cursor-pointer"
            >
              Ready to Drink
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick(`${ROUTES.CATEGORIES}/non-alcoholic`)}
              className="flex items-center py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent cursor-pointer"
            >
              Non-Alcoholic
            </button>
          </li>
        </ul>
        <hr />
        {headerLinks.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <button
              onClick={() => handleClick(href)}
              className="flex items-center py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent cursor-pointer"
            >
              {t(label)}
            </button>
          </li>
        ))}

      </ul>
    </DrawerWrapper>
  );
}
