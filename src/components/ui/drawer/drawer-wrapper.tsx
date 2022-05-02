import Logo from '@/components/ui/logo';
import { useAtom } from 'jotai';
import { useState, useEffect, Fragment } from 'react';
import { drawerAtom } from '@/store/drawer-atom';
import { CloseIcon } from '@/components/icons/close-icon';
import { useTranslation } from 'next-i18next';
import { MapPin } from '@/components/icons/map-pin';
import { Menu, Transition, Dialog } from '@headlessui/react';
import Scrollbar from '@/components/ui/scrollbar';
import Button from '@/components/ui/button';
import { logoPlaceholder } from '@/lib/placeholders';
import Link from '@/components/ui/link';
import cn from 'classnames';
import { ArrowDownIcon } from '@/components/icons/arrow-down';
import { Image } from '@/components/ui/image';

const DrawerWrapper: React.FC = ({ children }) => {
  const { t } = useTranslation('common');
  const [_, closeSidebar] = useAtom(drawerAtom);
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    //localStorage.setItem("cityName", "Ikoyi");
    setSelectedCity(window.localStorage.getItem("cityName"));
}, []);

  const onOpen =()=> {
  //  closeSidebar({ display: false, view: '' })
    setOpen(true);
  }

  const onClose =()=> {
    setOpen(false);
  }

  const handleSelectCity =(cityName)=> {
    setSelectedCity(cityName);
  }


  const handleLegal =()=> {
    if(selectedCity !== "") {

      if(selectedCity.toLowerCase() === "ikoyi" || selectedCity.toLowerCase() === "lekki" ||
      selectedCity.toLowerCase() === "victoria island" || selectedCity.toLowerCase() === "surulere" ||
      selectedCity.toLowerCase() === "ikeja") {
        console.log("City found! " + selectedCity);
        if (typeof window !== "undefined") {
          localStorage.setItem("cityStatus", 'FOUND');
          localStorage.setItem("cityName", selectedCity);
        }
        onClose();
        window.location.reload(true);

      }
    }
  }


  return (
    <div className="flex h-full flex-col">
      <div className="fixed top-0 z-20 mb-4 flex w-80 max-w-80 items-center justify-between border-b border-border-200 border-opacity-75 bg-accent p-5 md:mb-6">
        <Logo className="w-24 md:w-auto" />
        <button
           className="product-cart relative hover:text-underline flex items-center justify-start border border-light rounded px-1 py-1"
           onClick={onOpen}
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
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          static
          open={open}
          onClose={() => {}}
        >
          <div className="max-h-90 w-90 md:p-5 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50 w-90 h-90" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="product-card cart-type-krypton py-6 px-8 rounded border border-border-200 bg-accent inline-block min-w-content max-w-80 sm:p-8 align-middle transition-all relative">
                <div className=" modal-header flex justify-center">
                  <span className="relative h-10 w-32 overflow-hidden md:w-40">
                    <Image
                      src={logoPlaceholder}
                      alt={'Barectory'}
                      layout="fill"
                      objectFit="contain"
                      loading="eager"
                    />
                  </span>
                 </div>
                 <div className=" modal-body flex justify-center">
                    <div className=" py-3 text-center">
                      <h1 className="heading mt-4 text-accent font-bold text-lg text-light" style={{ fontWeight: 800, fontSize: "1.5rem" }}><strong>Update Location</strong></h1>
                    </div>
                  </div>
                  <div className=" modal-body flex flex-col justify-center">
                    <p className=" heading mt-4 text-sm text-light text-light">
                      Barectory is currently not available in selected areas.
                    </p>
                    <p className=" heading mb-5 text-sm text-light text-light">
                      Update to our one of service areas to purchase any of our products.
                    </p>
                 </div>
                    <div className="w-full">
                    <div className=" modal-body flex justify-center">
                       <div className=" pb-3 text-center">

                         <Menu
                           as="div"
                           className="relative inline-block ltr:text-left rtl:text-right w-100"
                         >
                           <Menu.Button
                              style={{ width: 200 + 'px' }}
                             className={cn(
                               'flex items-center shrink-0 text-sm md:text-base bg-light h-10 w-100 focus:outline-none text-body xl:px-4 border border-border-200 rounded-lg'
                             )}

                           >
                             {({ open }) => (
                               <>
                                 <span className="whitespace-nowrap text-sm pl-2">{selectedCity}</span>
                                 <span className="flex ltr:pr-2.5 rtl:pr-2.5 ltr:ml-auto rtl:mr-auto">
                                     <ArrowDownIcon
                                       className={cn('h-2 w-2', {
                                         'transform rotate-180': open,
                                       })}
                                     />
                                 </span>
                               </>
                             )}
                           </Menu.Button>

                           <Transition
                             as={Fragment}
                             enter="transition ease-out duration-100"
                             enterFrom="transform opacity-0 scale-95"
                             enterTo="transform opacity-100 scale-100"
                             leave="transition ease-in duration-75"
                             leaveFrom="transform opacity-100 scale-100"
                             leaveTo="transform opacity-0 scale-95"
                           >
                             <Menu.Items
                               as="ul"
                               className={cn(
                                 'absolute py-2 w-48 h-56 lg:h-60 2xl:h-auto min-h-40 max-h-56 sm:max-h-56 2xl:max-h-screen bg-light rounded shadow-700 focus:outline-none overflow-hidden'
                               )}
                             >
                               <Scrollbar
                                 className="w-full h-full"
                                 options={{
                                   scrollbars: {
                                     autoHide: 'never',
                                   },
                                 }}
                               >
                                   <Menu.Item key={1}>
                                     {({ active }) => (
                                       <button
                                         onClick={() => handleSelectCity('Ikoyi')}
                                         className={cn(
                                           'inline-flex items-center w-full text-accent text-sm font-semibold transition-colors hover:text-accent-hover focus:text-accent-hover focus:outline-none px-5 py-2 hover:bg-gray-200',
                                           active ? 'text-accent' : 'text-body-dark'
                                         )}
                                       >
                                         <span>Ikoyi</span>
                                       </button>
                                     )}
                                   </Menu.Item>
                                   <Menu.Item key={2}>
                                     {({ active }) => (
                                       <button
                                         onClick={() => handleSelectCity('Ikeja')}
                                         className={cn(
                                           'inline-flex items-center w-full text-accent text-sm font-semibold transition-colors hover:text-accent-hover focus:text-accent-hover focus:outline-none px-5 py-2 hover:bg-gray-200',
                                           active ? 'text-accent' : 'text-body-dark'
                                         )}
                                       >
                                         <span>Ikeja</span>
                                       </button>
                                     )}
                                   </Menu.Item>
                                   <Menu.Item key={3}>
                                     {({ active }) => (
                                       <button
                                         onClick={() => handleSelectCity('Lekki')}
                                         className={cn(
                                           'inline-flex items-center w-full text-accent text-sm font-semibold transition-colors hover:text-accent-hover focus:text-accent-hover focus:outline-none px-5 py-2 hover:bg-gray-200',
                                           active ? 'text-accent' : 'text-body-dark'
                                         )}
                                       >
                                         <span>Lekki</span>
                                       </button>
                                     )}
                                   </Menu.Item>
                                   <Menu.Item key={4}>
                                     {({ active }) => (
                                       <button
                                         onClick={() => handleSelectCity('Surulere')}
                                         className={cn(
                                           'inline-flex items-center w-full text-accent text-sm font-semibold transition-colors hover:text-accent-hover focus:text-accent-hover focus:outline-none px-5 py-2 hover:bg-gray-200',
                                           active ? 'text-accent' : 'text-body-dark'
                                         )}
                                       >
                                         <span>Surulere</span>
                                       </button>
                                     )}
                                   </Menu.Item>
                                   <Menu.Item key={5}>
                                     {({ active }) => (
                                       <button
                                         onClick={() => handleSelectCity('Victoria Island')}
                                         className={cn(
                                           'inline-flex items-center w-full text-sm text-accent font-semibold transition-colors hover:text-accent-hover focus:text-accent-hover focus:outline-none px-5 py-2 hover:bg-gray-200',
                                           active ? 'text-accent' : 'text-body-dark'
                                         )}
                                       >
                                         <span>Victoria Island</span>
                                       </button>
                                     )}
                                   </Menu.Item>
                               </Scrollbar>
                             </Menu.Items>
                           </Transition>
                         </Menu>
                       </div>
                     </div>
                    </div>
                  <div className=" modal-body flex justify-center">
                    <div className="flex justify-center px-2">
                      <button
                        className={cn(
                          'inline-flex items-center bg-light justify-center px-6 py-2 mr-1 shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none hover:bg-gray-200'
                        )}
                        onClick={handleLegal}
                        size="small"
                      >
                        <span className="text-accent">Confirm</span>
                      </button>
                      <button
                        className={cn(
                          'inline-flex items-center bg-light justify-center px-6 py-2 ml-1 shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none hover:bg-gray-200'
                        )}
                        onClick={onClose}
                        size="small"
                      >
                        <span className="text-accent">Cancel</span>
                      </button>
                    </div>
                  </div>
              {/*
                <div className=" modal-footer mt-5">
                      <button className=" btn-white text-accent text-sm">
                        Continue Browsing
                      </button>
                    </div>
              */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DrawerWrapper;
