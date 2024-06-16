import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

interface OTPFormProps {
    email: string;
  onSubmit: (otp: string) => void;
}

const OTPForm: React.FC<OTPFormProps> = ({ email, onSubmit }) => {
  const [otp, setOtp] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [number3, setNumber3] = useState('');
  const [number4, setNumber4] = useState('');
  const [error, setError] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setOtp(number1 + number2 + number3 + number4);
  }, [number1, number2, number3, number4]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      switch (index) {
        case 0:
          setNumber1(value);
          inputRefs.current[1]?.focus();
          break;
        case 1:
          setNumber2(value);
          inputRefs.current[2]?.focus();
          break;
        case 2:
          setNumber3(value);
          inputRefs.current[3]?.focus();
          break;
        case 3:
          setNumber4(value);
          break;
      }
    } else {
      e.target.value = '';
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace') {
      switch (index) {
        case 1:
          if (!number2) {
            inputRefs.current[0]?.focus();
            setNumber1('');
          }
          break;
        case 2:
          if (!number3) {
            inputRefs.current[1]?.focus();
            setNumber2('');
          }
          break;
        case 3:
          if (!number4) {
            inputRefs.current[2]?.focus();
            setNumber3('');
          }
          break;
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp === '1234') {
        onSubmit(otp);
        setShowSuccessDialog(true);
      } else {
        setError('Invalid OTP. You will be redirected to sign-in.');
        setTimeout(() => {
            window.location.href = '/sign-in';
        }, 3000);
      }
  };

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    const halfLength = Math.ceil(localPart.length / 2);
    const maskedLocalPart = localPart.slice(0, halfLength) + '*'.repeat(localPart.length - halfLength);
    return `${maskedLocalPart}@${domain}`;
  };


  const allInputsFilled = number1 && number2 && number3 && number4;

  return (
    <>
    <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl dark:text-white">
          <p>Email Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400 dark:text-gray-400">
            <p>We have sent a code to your email {maskEmail(email)}</p>
        </div>
      </div>
    <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
            {[number1, number2, number3, number4].map((number, index) => (
              <div key={index} className="w-16 h-16">
                <input
                  type="text"
                  value={number}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  required
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            ))}
            </div>
            <div className="flex flex-col space-y-5">
                <div>
                    <button 
                        type="submit" 
                        disabled={!allInputsFilled}
                        className={`w-full text-white ${
                            allInputsFilled
                              ? 'bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                              : 'bg-gray-400 cursor-not-allowed'
                          } font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                    >
                    Verify Account
                    </button>
                </div>
            </div>
          </div>
        </form>
        {showSuccessDialog && (
            <div id="static-modal" data-modal-backdrop="static" aria-hidden="true" className="modal__wrapper overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div className="relative p-4 w-full max-w-2xl max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 modal__content">
                      <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                            You have successfully logged in!
                          </h3>
                      </div>
                  </div>
              </div>
          </div>
        )}
        {error && (
            <div id="static-modal" data-modal-backdrop="static" aria-hidden="true" className="modal__wrapper overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div className="relative p-4 w-full max-w-2xl max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 modal__content">
                      <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                            {error}
                          </h3>
                      </div>
                  </div>
              </div>
          </div>
        )}
    </>
  );
};

export default OTPForm;