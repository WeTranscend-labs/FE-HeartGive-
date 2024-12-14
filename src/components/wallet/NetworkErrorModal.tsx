import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';

type NetworkErrorModalProps = {
  isShowing: boolean;
  toggle: () => void;
  disconnect: () => void;
};

const NetworkErrorModal = ({
  isShowing,
  toggle,
  disconnect,
}: NetworkErrorModalProps) => {
  return (
    <Modal toggle={toggle} isShowing={isShowing}>
      <div className="bg-white rounded-2xl p-6 max-w-[400px] mx-auto">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 mx-auto bg-primary-50 rounded-full flex items-center justify-center">
            <svg
              className="w-7 h-7 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Network Error
            </h2>
            <p className="text-sm text-gray-600">
              Please change the network to preprod or disconnect your wallet to
              continue.
            </p>
          </div>
          <Button
            onClick={disconnect}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
          >
            Disconnect Wallet
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NetworkErrorModal;
