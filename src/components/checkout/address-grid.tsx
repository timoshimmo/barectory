import { useModalAction } from '@/components/ui/modal/modal.context';
import { RadioGroup } from '@headlessui/react';
import { useAtom, WritableAtom } from 'jotai';
import { useEffect, useState } from 'react';
import AddressCard from '@/components/address/address-card';
import { AddressHeader } from '@/components/address/address-header';
import { useTranslation } from 'next-i18next';
import type { Address } from '@/types';
import AutocompleteAddress from "react-google-autocomplete";
import { useUpdateAddress } from '@/framework/user';
import Button from '@/components/ui/button';

interface AddressesProps {
  addresses: Address[] | undefined | null;
  label: string;
  atom: WritableAtom<Address | null, Address>;
  className?: string;
  userId: string;
  count: number;
  type: string;
}

export const AddressGrid: React.FC<AddressesProps> = ({
  addresses,
  label,
  atom,
  className,
  userId,
  count,
  type,
}) => {
  const { t } = useTranslation('common');
  const [selectedAddress, setAddress] = useAtom(atom);
  const { openModal } = useModalAction();
  const [addressLoading, setAddressLoading] = useState(false);
  const { mutate: updateAddress } = useUpdateAddress();

  const [addAddressStatus, setAddAddressStatus] = useState(false);

  //console.log("USERID: " + userId);

  useEffect(() => {
    if (addresses?.length) {
      if (selectedAddress?.id) {
        const index = addresses.findIndex((a) => a.id === selectedAddress.id);
        setAddress(addresses[index]);
      } else {
        setAddress(addresses?.[0]);
      }
    }
  }, [addresses, addresses?.length, selectedAddress?.id, setAddress]);

  function onAdd() {
    setAddAddressStatus(true);
    //openModal('ADD_OR_UPDATE_ADDRESS', { customerId: userId, type });
  }
  function onEdit(address: any) {
    setAddAddressStatus(true);
  //  setAddress('');
    //openModal('ADD_OR_UPDATE_ADDRESS', { customerId: userId, address });
  }
  function onDelete(address: any) {
    openModal('DELETE_ADDRESS', { customerId: userId, addressId: address?.id });
  }

  function onHandleAddress(address) {
  //  console.log("ADDRESS: " + JSON.stringify(address));
    const formattedInput = {
      id: addresses.length + 1,
      // customer_id: customerId,
      title: `address ${addresses.length + 1}`,
      type: 'shipping',
      address: address,
    };
    setAddress(formattedInput);
    //setAddAddressStatus(false);
    //closeModal();
  }

  async function handleSaveAddress() {
  //  setAddressLoading(true);
  //  console.log("ADDRESS: " + JSON.stringify(address));
    const formattedInput = {
      id: addresses.length + 1,
      // customer_id: customerId,
      title: `address ${addresses.length + 1}`,
      type: 'shipping',
      address: selectedAddress.address,
    };
    setAddress(formattedInput);
//    setAddAddressStatus(false);
    await updateAddress({
      id: userId,
      address: [formattedInput],
    });

//    setAddressLoading(false);
    //closeModal();
  }

  return (
    <div className={className}>
      <AddressHeader onAdd={onAdd} count={count} label={label} />
      {!addresses?.length ? (
        !addAddressStatus ?
          <div className="grid grid-cols-1 gap-4">
            <span className="relative px-5 py-6 text-base text-center bg-gray-100 border rounded border-border-200">
              {t('text-no-address')}
            </span>
          </div>
        :
        <div className="grid grid-cols-4 gap-2">
          <AutocompleteAddress
            apiKey={'AIzaSyDs_8LnDD8HGjgkPO5hLk08MTFOk6FJus8'}
            id="shippingAddress-input"
            className="w-100 border border-border-400 text-sm px-3 py-3 col-span-3 rounded hover:border-accent focus:border-accent"
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
          <Button
            className="!text-sm rounded"
            loading={addressLoading}
            disabled={addressLoading}
            onClick={handleSaveAddress}
          >
            Save
          </Button>
        </div>

      ) : (
        <RadioGroup value={selectedAddress} onChange={setAddress}>
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {addresses?.map((address) => (
              <RadioGroup.Option value={address} key={address?.id}>
                {({ checked }: { checked: boolean }) => (
                  <AddressCard
                    checked={checked}
                    onDelete={() => onDelete(address)}
                    onEdit={() => onEdit(address)}
                    address={address}
                  />
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      )}
    </div>
  );
};
export default AddressGrid;
