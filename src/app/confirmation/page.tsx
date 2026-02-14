'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Download, Home, MessageSquare, Copy, Check } from 'lucide-react';

export default function ConfirmationPage() {
  const router = useRouter();
  const [payment, setPayment] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  useEffect(() => {
    // Load payment data
    const currentPayment = localStorage.getItem('current_payment');
    if (currentPayment) {
      const paymentData = JSON.parse(currentPayment);
      setPayment(paymentData);
      
      // Show WhatsApp message after 1 second
      setTimeout(() => {
        setShowWhatsApp(true);
      }, 1000);
    } else {
      router.push('/appointment');
    }
  }, [router]);

  const copyToClipboard = () => {
    if (payment?.uniqueCode) {
      navigator.clipboard.writeText(payment.uniqueCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadReceipt = () => {
    if (!payment) return;

    const receiptContent = `
SMILESTONES CHILD DEVELOPMENT CENTRE
=====================================

REGISTRATION RECEIPT
-------------------

Date: ${new Date(payment.createdAt).toLocaleDateString()}
Time: ${new Date(payment.createdAt).toLocaleTimeString()}

UNIQUE REFERENCE CODE: ${payment.uniqueCode}

Selected Therapies:
${payment.therapies.map((t: any) => `- ${t.name}`).join('\n')}

Payment Details:
Payment Mode: ${payment.paymentMode.toUpperCase()}
Amount Paid: ₹${payment.amount.toFixed(2)}

IMPORTANT: Please keep this reference code for future use.

Thank you for choosing Smilestones Centre!

Contact: +91 9445051166
Email: info@smilestonescentre.com
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Smilestones-Receipt-${payment.uniqueCode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const whatsappMessage = `Your registration at Smilestones Child Development Centre is successful. Your unique reference code is ${payment.uniqueCode}. Please keep it for future use.`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* WhatsApp Message Modal */}
      {showWhatsApp && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">WhatsApp Confirmation</h3>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-4">
              <p className="text-base text-gray-900 leading-relaxed">{whatsappMessage}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-700 font-semibold mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Message sent successfully</span>
            </div>
            <button
              onClick={() => setShowWhatsApp(false)}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce">
            <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
          <p className="text-base sm:text-lg text-gray-700 font-medium">Your registration is complete</p>
        </div>

        {/* Unique Code Card */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-6 sm:p-8 mb-6 text-white">
          <p className="text-sm sm:text-base opacity-90 mb-2 font-medium">Your Unique Reference Code</p>
          <div className="flex items-center justify-between gap-4">
            <p className="text-3xl sm:text-4xl font-bold tracking-wider">{payment.uniqueCode}</p>
            <button
              onClick={copyToClipboard}
              className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-6 h-6" />
              ) : (
                <Copy className="w-6 h-6" />
              )}
            </button>
          </div>
          <p className="text-xs sm:text-sm opacity-90 mt-3 font-medium">
            ⚠️ Please save this code for future reference
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Registration Details</h2>

          <div className="space-y-4">
            {/* Date & Time */}
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-gray-700 font-medium">Date & Time</span>
              <span className="font-bold text-gray-900">
                {new Date(payment.createdAt).toLocaleString()}
              </span>
            </div>

            {/* Payment Mode */}
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-gray-700 font-medium">Payment Mode</span>
              <span className="font-bold text-gray-900">{payment.paymentMode.toUpperCase()}</span>
            </div>

            {/* Amount */}
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-gray-700 font-medium">Amount Paid</span>
              <span className="font-bold text-green-700">₹{payment.amount.toFixed(2)}</span>
            </div>

            {/* Therapies */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm sm:text-base font-bold text-gray-900 mb-3">Selected Therapies:</p>
              <div className="space-y-2">
                {payment.therapies.map((therapy: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-sm sm:text-base">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-800">{therapy.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleDownloadReceipt}
            className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Download className="w-5 h-5" />
            Download Receipt
          </button>

          <button
            onClick={() => router.push('/')}
            className="px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-sm sm:text-base text-blue-900">
            <li className="flex items-start gap-2">
              <span className="text-blue-700 font-bold">1.</span>
              <span>Our team will contact you within 24 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-700 font-bold">2.</span>
              <span>Keep your unique code ready for reference</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-700 font-bold">3.</span>
              <span>Check your WhatsApp for confirmation message</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-700 font-bold">4.</span>
              <span>Download and save your receipt</span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-6 text-sm sm:text-base text-gray-700">
          <p className="font-medium">Need help? Contact us at</p>
          <p className="font-bold text-gray-900 text-lg">+91 9445051166</p>
        </div>
      </div>
    </div>
  );
}
