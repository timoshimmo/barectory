import React, { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { Menu, Transition, Dialog } from '@headlessui/react';
import cn from 'classnames';
import { Element } from 'react-scroll';
import Link from '@/components/ui/link';
import Button from '@/components/ui/button';
import Scrollbar from '@/components/ui/scrollbar';
import { useTranslation } from 'next-i18next';
import { Image } from '@/components/ui/image';
import { logoPlaceholder } from '@/lib/placeholders';
import { ArrowDownIcon } from '@/components/icons/arrow-down';

export default function SubscribePopup() {

  const [open, setOpen] = useState(true);
  const [openPlace, setOpenPlace] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Select City');
  const [enterCity, setEnterCity] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [lAge, setlAge] = useState('DEFAULT');
  const [newCity, setNewCity] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const router = useRouter();

  const { t } = useTranslation('common');

  useEffect(() => {
  //  localStorage.setItem("legalAge", 'DEFAULT');
    setlAge(window.localStorage.getItem("legalAge"));
    console.log(lAge);

  },[lAge]);

  const onClose =()=> {
    setOpen(false);
  }

  const onClosePlace =()=> {
    setOpenPlace(false);
  }

  const onOpenPlace =()=> {
    setOpenPlace(true);
  }

  const handleSelectCity =(cityName)=> {
    setSelectedCity(cityName);
  }

  const handleOpenInput = () => {
    setSelectedCity('Enter your city');
    setEnterCity(true);
  }

  const handleOpenEmail = () => {
    setOpenEmail(true);
  }

  const handleCloseEmail = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("legalAge", "LEGAL");
      localStorage.setItem("cityStatus", 'NOTFOUND');
    }
    setOpenEmail(false);
    window.location.reload(true);
  }


  const handleSubmitEmail = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("legalAge", "LEGAL");
      localStorage.setItem("cityStatus", 'NOTFOUND');
    }
    setOpenEmail(false);
    window.location.reload(true);
  }

  const handleCloseInput = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("legalAge", "ILLEGAL");
    }
    onClosePlace();
  }

  const handleNotLegal =()=> {
    if (typeof window !== "undefined") {
      localStorage.setItem("legalAge", "ILLEGAL");
    }
    onClose();
    router.push('/underage');
  }

  const handleLegal =()=> {
    if(selectedCity !== "") {

      if(selectedCity.toLowerCase() === "ikoyi" || selectedCity.toLowerCase() === "lekki" ||
      selectedCity.toLowerCase() === "victoria island" || selectedCity.toLowerCase() === "surulere" ||
      selectedCity.toLowerCase() === "ikeja") {
        console.log("City found! " + selectedCity);
        if (typeof window !== "undefined") {
          localStorage.setItem("legalAge", "LEGAL");
          localStorage.setItem("cityStatus", 'FOUND');
        }
        onClose();
        window.location.reload(true);

      }
      else {
        console.log("City not available: " + selectedCity.toLowerCase());
        handleOpenEmail();
        onClose();
      }
    }
  }

  const handleOnChange = (e: any) => {
    const { value: inputValue } = e.target;
    setSelectedCity(inputValue);
  };

  const handleOnChangeEmail = (e: any) => {
    const { value: emailValue } = e.target;
    setNewEmail(emailValue);
  };

  const handleEmailSubmitted =()=> {
    if (typeof window !== "undefined") {
         localStorage.setItem("legalAge", "LEGAL");
    }
    setOpenEmail(false);
  }

  return (
    <>
      {lAge !== "LEGAL" &&
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
                        <h1 className="heading mt-4 text-accent font-bold text-lg text-light" style={{ fontWeight: 800, fontSize: "1.5rem" }}><strong>Welcome To Barectory</strong></h1>
                      </div>
                    </div>
                    <div className=" modal-body flex justify-center">
                      <p className=" heading mt-4 text-sm text-light mb-2 text-light">
                        Barectory is currently available in certain cities
                      </p>
                   </div>
                  {!enterCity ?
                    (
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
                                           onClick={handleOpenInput}
                                           className={cn(
                                             'inline-flex items-center w-full text-body-dark bg-gray-100 text-sm transition-colors hover:text-accent-hover focus:text-body-dark focus:outline-none px-5 py-2 hover:bg-gray-300',
                                             active ? 'text-body-dark' : 'text-body-dark'
                                           )}
                                         >
                                           <span><i>Enter your city</i></span>
                                         </button>
                                       )}
                                     </Menu.Item>
                                     <Menu.Item key={2}>
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
                                     <Menu.Item key={3}>
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
                                     <Menu.Item key={4}>
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
                                     <Menu.Item key={5}>
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
                                     <Menu.Item key={6}>
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
                     )
                       :
                       (
                         <div>
                           <div className=" modal-body flex justify-center row">
                              <div className=" py-3 text-center">
                                <input
                                  id="newCity"
                                  type="text"
                                  value={selectedCity}
                                  onChange={handleOnChange}
                                  autoComplete="off"
                                  placeholder="Enter your city"
                                  className='search item-center flex h-full w-200 appearance-none overflow-hidden truncate rounded-lg text-sm text-heading placeholder-gray-500 transition duration-300 ease-in-out focus:outline-none focus:ring-0'
                                />
                              </div>
                            </div>
                          </div>
                        )
                      }
                     <div className=" modal-body flex justify-center">
                         <p className=" heading mt-4 text-sm text-light">
                           You must be of legal drinking age (18+) in the country to access this site
                         </p>
                    </div>
                    <div className=" modal-body flex justify-center">
                       <div className=" pb-1 text-center">
                         <h2 className=" heading mt-4 text-light font-bold text-lg">Are you of legal drinking age?</h2>
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
                          <span className="text-accent">Yes</span>
                        </button>
                        <button
                          className={cn(
                            'inline-flex items-center bg-light justify-center px-6 py-2 ml-1 shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none hover:bg-gray-200'
                          )}
                          onClick={handleNotLegal}
                          size="small"
                        >
                          <span className="text-accent">No</span>
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
      }

      <Transition show={openEmail} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          static
          open={openEmail}
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
                      <h1 className=" heading mt-4 text-light font-bold text-lg">Thank you for visiting Barectory</h1>
                    </div>
                  </div>
                  <div className=" modal-body flex flex-col justify-center mt-4">
                    <p className=" heading text-sm text-light text-light">
                      We currently do not serve your city.
                    </p>
                    <p className=" heading text-sm text-light text-light">
                      But you can continue to browse our products
                    </p>
                 </div>
                 <div className=" modal-body flex justify-center mt-5">
                   <p className=" heading text-sm text-light mb-3 text-light">
                     Enter your email below so we update you when we start serving your city
                   </p>
                 </div>
                   <div>
                     <div className=" modal-body flex justify-center row w-full pt-1 pb-3">
                          <input
                            id="newEmail"
                            type="email"
                            value={newEmail}
                            onChange={handleOnChangeEmail}
                            autoComplete="off"
                            placeholder="Enter your email"
                            className='search item-center flex h-full w-full appearance-none overflow-hidden truncate rounded-lg text-sm text-heading placeholder-gray-500 transition duration-300 ease-in-out focus:outline-none focus:ring-0'
                          />
                      </div>
                      <div className="flex justify-center px-2">
                        <button
                          className={cn(
                            'inline-flex items-center bg-light justify-center px-6 py-2 ml-1 shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none hover:bg-gray-200 disabled:bg-gray-400'
                          )}
                          onClick={handleSubmitEmail}
                          size="small"
                          disabled={!newEmail.includes("@")}
                        >
                          <span className="text-sm">Submit</span>
                        </button>

                      </div>
                    </div>
                    <div className=" modal-footer mt-5">
                      <button onClick={handleCloseEmail} className="text-light bg-accent hover:bg-accent text-sm" style={{ fontWeight:400, fontSize: "0.8rem" }}>
                        Skip
                      </button>
                    </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );


}
