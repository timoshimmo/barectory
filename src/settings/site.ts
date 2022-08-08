import { ROUTES } from '@/lib/routes';
export const siteSettings = {
  name: 'Barectory',
  description: '',
  logo: {
    url: '/logo.svg',
    alt: 'Barectory',
    href: '/grocery',
    width: 135,
    height: 50,
  },
  defaultLanguage: 'en',
  currencyCode: 'NGN',
  product: {
    placeholderImage: '/product-placeholder.svg',
    cardMaps: {
      grocery: 'Krypton',
      furniture: 'Radon',
      bag: 'Oganesson',
      makeup: 'Neon',
      book: 'Xenon',
      medicine: 'Helium',
      default: 'Argon',
    },
  },
  authorizedLinks: [
    { href: ROUTES.PROFILE, label: 'auth-menu-profile' },
    { href: ROUTES.ORDERS, label: 'auth-menu-my-orders' },
    { href: ROUTES.CHECKOUT, label: 'auth-menu-checkout' },
  ],
  authorizedLinksMobile: [
    { href: ROUTES.PROFILE, label: 'auth-menu-profile' },
    { href: ROUTES.ORDERS, label: 'auth-menu-my-orders' },
    { href: ROUTES.REFUNDS, label: 'text-my-refunds' },
    { href: ROUTES.CHECKOUT, label: 'auth-menu-checkout' },
    { href: ROUTES.CHANGE_PASSWORD, label: 'profile-sidebar-password' },
    { href: ROUTES.LOGOUT, label: 'auth-menu-logout' },
  ],
  dashboardSidebarMenu: [
    {
      href: ROUTES.PROFILE,
      label: 'profile-sidebar-profile',
    },
    {
      href: ROUTES.CHANGE_PASSWORD,
      label: 'profile-sidebar-password',
    },
    {
      href: ROUTES.ORDERS,
      label: 'profile-sidebar-orders',
    },
    {
      href: ROUTES.HELP,
      label: 'profile-sidebar-help',
    },
    {
      href: ROUTES.LOGOUT,
      label: 'profile-sidebar-logout',
    },
  ],
  sellingAdvertisement: {
    image: {
      src: '/selling.png',
      alt: 'Selling Advertisement',
    },
  },
  cta: {
    mockup_img_src: '/mockup-img.png',
    play_store_link: '/',
    app_store_link: '/',
  },
  footer: {
    copyright: {
      name: 'Barectory, Inc',
      href: 'https://barectory.com',
    },
    address: `10 Agard Street, Sabo, Yaba,
Lagos, Nigeria.`,
    email: 'barectorynigeria@gmail.com ',
    phone: '+2348181513324',
    menus: [
      {
        title: 'Explore',
        links: [
          {
            name: 'About',
            href: '/about',
          },
          {
            name: 'Blog',
            href: '/blogs',
          },
          {
            name: 'Events',
            href: '/',
          },
        ],
      },
      {
        title: 'Customer Service',
        links: [
          {
            name: 'FAQ & Help',
            href: ROUTES.HELP,
          },
          {
            name: 'Contact Us',
            href: ROUTES.CONTACT,
          },
        ],
      },
      {
        title: 'Our Information',
        links: [
          {
            name: 'Privacy Policy',
            href: ROUTES.PRIVACY,
          },
          {
            name: 'Terms & Conditions',
            href: ROUTES.TERMS,
          },
          {
            name: 'Return Policy',
            href: ROUTES.RETURN_POLICY,
          }
        ],
      },
    ],
    payment_methods: [
      {
        img: '/payment/master.png',
        url: '/',
      },
      {
        img: '/payment/visa.png',
        url: '/',
      },
      {
        img: '/payment/paystack.png',
        url: '/',
      },
    ],
  },
};

/*

{
  href: ROUTES.DOWNLOADS,
  label: 'profile-sidebar-downloads',
},
{
  href: ROUTES.REFUNDS,
  label: 'text-my-refunds',
},
*/
