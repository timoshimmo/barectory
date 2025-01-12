import dynamic from 'next/dynamic';
import Modal from '@/components/ui/modal/modal';
import { useModalAction, useModalState } from './modal.context';
const OtpLoginView = dynamic(() => import('@/components/auth/otp-login'));
const Login = dynamic(() => import('@/components/auth/login-form'), {
  ssr: false,
});
const Register = dynamic(() => import('@/components/auth/register-form'));
const ForgotPassword = dynamic(
  () => import('@/components/auth/forgot-password')
);

const SuccessfulReg = dynamic(
  () => import('@/components/auth/successful-registration')
);

const SentResetLink = dynamic(
  () => import('@/components/auth/successful-reset-link')
);

const ProductDetailsModalView = dynamic(
  () => import('@/components/products/details/popup'),
  { ssr: false }
);
const ShopInfoCard = dynamic(() => import('@/components/shops/sidebar'));
const CreateOrUpdateAddressForm = dynamic(
  () => import('@/components/address/address-form'),
  { ssr: false }
);
const CreateOrUpdateGuestAddressForm = dynamic(
  () => import('@/components/checkout/create-or-update-guest')
);
const AddressDeleteView = dynamic(
  () => import('@/components/address/delete-view')
);
const AddOrUpdateCheckoutContact = dynamic(
  () => import('@/components/checkout/contact/add-or-update')
);

const AddOrUpdateCheckoutEmail = dynamic(
  () => import('@/components/checkout/email/add-or-update')
);


const ProfileAddOrUpdateContact = dynamic(
  () => import('@/components/profile/profile-add-or-update-contact')
);
const CreateRefundView = dynamic(
  () => import('@/components/refunds/refund-form')
);

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'LOGIN_VIEW' && <Login />}
      {view === 'REGISTER' && <Register />}
      {view === 'FORGOT_VIEW' && <ForgotPassword />}
      {view === 'OTP_LOGIN' && <OtpLoginView />}
      {view === 'REFUND_REQUEST' && <CreateRefundView />}
      {view === 'ADD_OR_UPDATE_ADDRESS' && <CreateOrUpdateAddressForm />}
      {view === 'ADD_OR_UPDATE_GUEST_ADDRESS' && (
        <CreateOrUpdateGuestAddressForm />
      )}
      {view === 'ADD_OR_UPDATE_CHECKOUT_CONTACT' && (
        <AddOrUpdateCheckoutContact />
      )}
      {view === 'ADD_OR_UPDATE_CHECKOUT_EMAIL' && (
        <AddOrUpdateCheckoutEmail />
      )}
      {view === 'ADD_OR_UPDATE_PROFILE_CONTACT' && (
        <ProfileAddOrUpdateContact />
      )}
      {view === 'DELETE_ADDRESS' && <AddressDeleteView />}
      {view === 'PRODUCT_DETAILS' && (
        <ProductDetailsModalView productSlug={data} />
      )}
      {view === 'SHOP_INFO' && (
        <ShopInfoCard
          shop={data?.shop}
          cardClassName="!hidden"
          className="!flex !h-screen !w-screen max-w-screen-sm flex-col"
        />
      )}
      {view === 'SUCCESSFUL_REGISTRATION' && <SuccessfulReg />}
      {view === 'RESET_LINK_SENT' && <SentResetLink />}
    </Modal>
  );
};

export default ManagedModal;
