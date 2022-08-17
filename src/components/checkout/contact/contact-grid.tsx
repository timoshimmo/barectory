import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { customerContactAtom, customerEmailAtom, customerFirstNameAtom, customerLastNameAtom } from '@/store/checkout';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { PlusIcon } from '@/components/icons/plus-icon';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import PhoneInput from '@/components/ui/forms/phone-input';
import Input from '@/components/ui/forms/input';
import { useForm, useWatch } from "react-hook-form";

interface ContactProps {
  contact: string | undefined | null;
  email: string | undefined | null;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  label: string;
  count?: number;
  className?: string;
  gridClassName?: string;
}

const ContactGrid = ({
  contact,
  email,
  firstName,
  lastName,
  label,
  count,
  className,
  gridClassName,
}: ContactProps) => {

  const {
  register,
  setValue,
  reset,
  formState: { isDirty },
  watch,
  getValues,
} = useForm();

  const [contactNumber, setContactNumber] = useAtom(customerContactAtom);
  const [contactEmail, setContactEmail] = useAtom(customerEmailAtom);
  const [contactFirstName, setContactFirstName] = useAtom(customerFirstNameAtom);
  const [contactLastName, setContactLastName] = useAtom(customerLastNameAtom);
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');

  useEffect(() => {

    let defaultValues = {};
    if (contact) {
      setContactNumber(contact);
    }
    if (firstName) {
      setContactFirstName(firstName);
      //setValue("first_name", firstName);
      defaultValues.first_name = firstName;
    }
    if (email) {
      setContactEmail(email);
      //setValue("emailAddress", email);
      defaultValues.emailAddress = email;
    }
    if (lastName) {
      setContactLastName(lastName);
      //setValue("last_name", lastName);
      defaultValues.last_name = lastName;
    }

    reset({ ...defaultValues });
//    setContactNumber('');
  //  setContactEmail('');
  //  setContactFirstName('');
  //  setContactLastName('');
}, [contact, setContactNumber, email, setContactEmail, contactFirstName, setContactFirstName, contactLastName, setContactLastName]);

/*useEffect(() => {

  const wchFirstname = watch("first_name");
  const wchLastname = watch("last_name");
  const wchEmail = watch("emailAddress");
  console.log("Edited Firstname: " + wchFirstname);

  setContactFirstName(watch("first_name"));
  setContactLastName(wchLastname);
  setContactEmail(wchEmail);

},[contactFirstName, setContactFirstName]); */

/*
  const wchFirstname = watch("first_name");
  const getFirstName = getValues("first_name");
  console.log("Edited Firstname: " + wchFirstname);
  console.log("Get Firstname: " + getFirstName);

  */


  function onFirstNameChange(event) {
  //  defaultValues.first_name
    console.log("FIRST NAME: " + contactFirstName);
    setContactFirstName(event.target.value);
    //closeModal();
  }

  function onLastNameChange(event) {
  //  console.log("LAST NAME: " + contactLastName);
    setContactLastName(event.target.value);
    //closeModal();
  }

  function onEmailChange(event) {
    //console.log("CONTACT: " + event.target.value);
    setContactEmail(event.target.value);
    //closeModal();
  }

  function onContactNumberChange(phoneNo) {
    //console.log("CONTACT: " + phoneNo.phone);
    setContactNumber(phoneNo.phone);
    //closeModal();
  }

  function onAddOrChange() {
    openModal('ADD_OR_UPDATE_CHECKOUT_CONTACT');
  }
  return (
    <div className={className}>
      <div
        className={classNames('mb-5 flex items-center justify-between', {
          'md:mb-8': count,
        })}
      >
        <div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
          {count && (
            <span className="flex items-center justify-center w-8 h-8 text-base rounded-full bg-accent text-light lg:text-xl">
              {count}
            </span>
          )}
          <p className="text-lg capitalize text-heading lg:text-xl">{label}</p>
        </div>

        {/*

          <button
            className="flex items-center text-sm font-semibold transition-colors duration-200 text-accent hover:text-accent-hover focus:text-accent-hover focus:outline-none"
            onClick={onAddOrChange}
          >
            <PlusIcon className="h-4 w-4 stroke-2 ltr:mr-0.5 rtl:ml-0.5" />
            {contactNumber ? t('text-update') : t('text-add')}
          </button>
        */}
      </div>

      <div className={classNames('w-full', gridClassName)}>
        <div className="flex w-full">
          <div className="w-[50%] pr-2">
            <label>First name</label>
            <Input
              disabled={false}
              {...register("first_name")}
              onChange={e => {
                register("first_name").onChange(e);
                onFirstNameChange(e);
              }}
              className="mb-5"
              inputClass="!p-0 ltr:!pr-4 rtl:!pl-4 ltr:!pl-14 rtl:!pr-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base !rounded focus:!border-accent !h-12"
              dropdownclass="focus:!ring-0 !border !border-border-base !shadow-350"
            />
          </div>
          <div className="w-[50%] pl-2">
            <label>Last name</label>
            <Input
              disabled={false}
              {...register("last_name")}
              onChange={e => {
                register("last_name").onChange(e);
                onLastNameChange(e);
              }}
              className="mb-5"
              inputClass="!p-0 ltr:!pr-4 rtl:!pl-4 ltr:!pl-14 rtl:!pr-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base !rounded focus:!border-accent !h-12"
              dropdownclass="focus:!ring-0 !border !border-border-base !shadow-350"
            />
          </div>
        </div>

        <label>Phone number</label>
        <PhoneInput
          country="ng"
          disabled={false}
          className="mb-5"
          defaultValue={contactNumber}
          onChange={phone => onContactNumberChange({ phone })}
          inputClass="!p-0 ltr:!pr-4 rtl:!pl-4 ltr:!pl-14 rtl:!pr-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base !rounded focus:!border-accent !h-12"
          dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
        />

        <label>Email</label>
        <Input
          disabled={false}
          {...register("emailAddress")}
          onChange={e => {
            register("emailAddress").onChange(e);
            onEmailChange(e);
          }}
          inputClass="!p-0 ltr:!pr-4 rtl:!pl-4 ltr:!pl-14 rtl:!pr-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base !rounded focus:!border-accent !h-12"
          dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
        />
      </div>
    </div>
  );
};

export default ContactGrid;
