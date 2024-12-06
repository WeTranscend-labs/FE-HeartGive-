import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Transaction } from '../types/fund';
import { formatCurrency } from '../utils/format';
import { formatDate } from '../utils/date';

interface TransactionModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionModal({ transaction, isOpen, onClose }: TransactionModalProps) {
  if (!transaction) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Transaction Details
                </Dialog.Title>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Amount</h4>
                    <p className="text-lg font-semibold text-green-600">
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">From Wallet</h4>
                    <p className="text-gray-900 font-mono break-all">
                      {transaction.fromWallet}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date</h4>
                    <p className="text-gray-900">
                      {formatDate(transaction.timestamp)}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Transaction ID</h4>
                    <p className="text-gray-900 font-mono text-sm break-all">
                      {transaction.id}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}