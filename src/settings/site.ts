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
      href: ROUTES.DOWNLOADS,
      label: 'profile-sidebar-downloads',
    },
    {
      href: ROUTES.REFUNDS,
      label: 'text-my-refunds',
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
      href: 'https://redq.io/',
    },
    address: '2429 River Drive, Suite 35 Cottonhall, CA 2296 United Kingdom',
    email: 'dummy@dummy.com',
    phone: '+1 256-698-0694',
    menus: [
      {
        title: 'text-explore',
        links: [
          {
            name: 'text-about-us',
            href: '/',
          },
          {
            name: 'text-sitemap',
            href: '/',
          },
          {
            name: 'Register',
            href: '/',
          },
          {
            name: 'Sign in',
            href: '/',
          },
        ],
      },
      {
        title: 'text-customer-service',
        links: [
          {
            name: 'text-faq-help',
            href: ROUTES.HELP,
          },
          {
            name: 'text-returns',
            href: '/refunds',
          },
          {
            name: 'text-contact-us',
            href: ROUTES.CONTACT,
          },
          {
            name: 'text-store-pickup',
            href: '/',
          },
        ],
      },
      {
        title: 'text-our-information',
        links: [
          {
            name: 'text-privacy-policy',
            href: ROUTES.PRIVACY,
          },
          {
            name: 'text-terms-condition',
            href: ROUTES.TERMS,
          },
          {
            name: 'text-return-policy',
            href: '/',
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
