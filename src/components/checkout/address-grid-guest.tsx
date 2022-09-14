import { useEffect } from 'react';
import type { Address } from '@/types';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { shippingAddressAtom } from '@/store/checkout';
import { RadioGroup } from '@headlessui/react';
import { useAtom, WritableAtom } from 'jotai';
import { useState } from 'react';
import AddressCard from '@/components/address/address-card-guest';
import { AddressHeader } from '@/components/address/address-header';
import { useTranslation } from 'next-i18next';
import AutocompleteAddress from "react-google-autocomplete";

interface AddressesProps {
  addresses: Address[] | undefined;
  label: string;
  atom: WritableAtom<Address | null, Address>;
  className?: string;
  count: number;
  type: string;
}

export const GuestAddressGrid: React.FC<AddressesProps> = ({
  addresses,
  label,
  atom,
  className,
  count,
  type,
}) => {
  const { t } = useTranslation('common');
  const [selectedAddress, setAddress] = useAtom(shippingAddressAtom);
//  const [selectedAddress, setAddress] = useAtom(atom);
  const [selectedAddressTitle, setAddressTitle] = useState('');
  const { openModal } = useModalAction();

  useEffect(() => {
    if (selectedAddress) {
      setAddress(selectedAddress);
      return;
    }
  }, [selectedAddress, setAddress]);

  function onAdd() {
    openModal('ADD_OR_UPDATE_GUEST_ADDRESS', { type, atom });
  }

  function onEdit(address: any) {
    openModal('ADD_OR_UPDATE_GUEST_ADDRESS', { type, atom, address });
  }

  function onClearAddress() {
    setAddress('');
  }

  function onHandleAddress(address) {
  //  console.log("ADDRESS: " + JSON.stringify(address));
    const formattedInput = {
      id: "1",
      // customer_id: customerId,
      title: "home",
      type: 'shipping',
      address: address,
    };
    setAddress(formattedInput);
    //closeModal();
  }

  return (
    <div className={className}>
      <AddressHeader count={count} label={label} />
      {/*
<AddressHeader onAdd={onAdd} count={count} label={label} />
         */}
      <div className="grid grid-cols-1">
        {!selectedAddress &&
          <AutocompleteAddress
            apiKey={'AIzaSyC8KiDaCQhg1hk8wcLbbZLtu9ejUeaQsz8'}
            id="shippingAddress-input"
            className="w-100 border border-border-400 text-sm px-3 py-3 rounded hover:border-accent focus:border-accent"
            placeholder="Enter street address"
            variant="outline"
            onPlaceSelected={(place) => {
              onHandleAddress(place)
            }}
            options={{
              types: ["address"],
              componentRestrictions: { country: "ng" }
            }}
          />
        }
      </div>
      <div className="grid grid-cols-3">
        {selectedAddress &&
          (
            <AddressCard
              checked={false}
              address={selectedAddress.address.formatted_address}
              onEdit={() => onClearAddress()}
            />
          )
        }
      </div>

      {/*

        addresses && addresses?.length ? (
        <RadioGroup as="span" value={selectedAddress} onChange={setAddress}>
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {addresses?.map((address) => (
              <RadioGroup.Option value={address} key={address?.id}>
                {({ checked }) => (
                  <AddressCard
                    checked={checked}
                    address={address}
                    onEdit={() => onEdit(address)}
                  />
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">
            {t('text-no-address')}
          </span>
        </div>
      ) */}
    </div>
  );
};
export default GuestAddressGrid;
