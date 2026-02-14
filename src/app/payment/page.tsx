'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Smartphone, Building, ArrowRight, CheckCircle } from 'lucide-react';

const paymentModes = [
  {
    id: 'upi',
    name: 'UPI',
    icon: Smartphone,
    description: 'Pay using Google Pay, PhonePe, Paytm',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'credit',
    name: 'Credit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, Amex',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'debit',
    name: 'Debit Card',
    icon: CreditCard,
    description: 'All major banks accepted',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: Building,
    description: 'Direct bank transfer',
    color: 'from-orange-500 to-orange-600'
  }
];

export default function PaymentPage() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedTherapies, setSelectedTherapies] = useState<any[]>([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Load selected therapies
    const therapies = localStorage.getItem('parent_selected_therapy');
    if (therapies) {
      setSelectedTherapies(JSON.parse(therapies));
    } else {
      router.push('/therapy');
    }
  }, [router]);

  const calculateTotal = () => {
    const basePrice = 1500; // Demo price per therapy
    const subtotal = selectedTherapies.length * basePrice;
    const tax = subtotal * 0.18; // 18% GST
    return {
      subtotal,
      tax,
      total: subtotal + tax
    };
  };

  const handlePayment = () => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Generate unique code
      const uniqueCode = 'SMILE-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      // Save payment record
      const payments = JSON.parse(localStorage.getItem('parent_payments') || '[]');
      const newPayment = {
        id: Date.now().toString(),
        therapies: selectedTherapies,
        paymentMode: selectedPayment,
        amount: calculateTotal().total,
        uniqueCode,
        createdAt: new Date().toISOString()
      };
      payments.push(newPayment);
      localStorage.setItem('parent_payments', JSON.stringify(payments));

      // Store current payment for confirmation page
      localStorage.setItem('current_payment', JSON.stringify(newPayment));

      setProcessing(false);
      router.push('/confirmation');
    }, 2000);
  };

  const { subtotal, tax, total } = calculateTotal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Payment</h1>
              <p className="text-xs sm:text-sm text-gray-700">Complete your registration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 h-fit">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Payment Summary</h2>

            {/* Selected Therapies */}
            <div className="space-y-3 mb-6">
              {selectedTherapies.map((therapy, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-bold text-gray-900">{therapy.name}</p>
                    <p className="text-xs sm:text-sm text-gray-700">{therapy.duration}</p>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-gray-900">₹1,500</p>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-700 font-medium">Subtotal</span>
                <span className="font-bold text-gray-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-700 font-medium">GST (18%)</span>
                <span className="font-bold text-gray-900">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base sm:text-lg pt-3 border-t border-gray-200">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="font-bold text-blue-700">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Select Payment Method</h2>

            <div className="space-y-3 mb-6">
              {paymentModes.map((mode) => {
                const Icon = mode.icon;
                const isSelected = selectedPayment === mode.id;

                return (
                  <div
                    key={mode.id}
                    onClick={() => setSelectedPayment(mode.id)}
                    className={`relative flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all bg-white ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-200'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${mode.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white drop-shadow-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base font-bold text-gray-900">{mode.name}</p>
                      <p className="text-xs sm:text-sm text-gray-700">{mode.description}</p>
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={!selectedPayment || processing}
              className={`w-full px-6 py-4 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-base sm:text-lg ${
                selectedPayment && !processing
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  Pay ₹{total.toFixed(2)}
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </>
              )}
            </button>

            {/* Security Note */}
            <p className="text-xs text-center text-gray-700 mt-4 font-medium">
              🔒 Your payment is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
