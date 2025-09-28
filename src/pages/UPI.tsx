import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Mountain,
  TreePine,
  Waves,
  Sun,
  Star,
  Gem,
  ArrowLeft,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer1";

const MockUPIPayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get totalAmount from navigation state
  const totalAmount = location.state?.totalAmount || 0;

  // Fallback if totalAmount is 0
  if (totalAmount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 text-white">
        <Navigation />
        <div className="text-center p-6">
          <p className="text-2xl font-bold mb-4">
            No payment amount found
          </p>
          <p className="mb-6">Please go back and add items to your cart.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold"
          >
            Go Back
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const [status, setStatus] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const simulatePayment = async (result: "success" | "failure") => {
    setIsProcessing(true);
    setStatus(null);
    setShowSuccess(false);
    setShowFailure(false);
    setLastAction(result);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);

    if (result === "success") {
      setStatus("Payment Successful!");
      setShowSuccess(true);
    } else {
      setStatus("Payment Failed! Please try again.");
      setShowFailure(true);
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
        setShowSuccess(false);
        setShowFailure(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 relative overflow-hidden">
      <Navigation />

      <div className="h-16" />

      <div className="flex-1 relative flex items-center justify-center p-4">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl blur opacity-40 animate-pulse"></div>

          <div className="relative bg-gradient-to-br from-amber-50/20 to-orange-100/20 backdrop-blur-xl border-2 border-yellow-500/30 rounded-3xl p-8 w-96 shadow-2xl">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-orange-200" />
            </button>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="bg-gradient-to-r from-saffron-500 to-orange-600 p-4 rounded-full shadow-xl border-4 border-yellow-400/50">
                    <Mountain className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
                Jharkhand Tourism
              </h1>
              <h2 className="text-lg font-semibold text-orange-100 mb-1">
                Secure Payment Gateway
              </h2>
              <p className="text-amber-200 text-sm flex items-center justify-center">
                <TreePine className="w-4 h-4 mr-1" />
                Experience Natural Beauty
                <Waves className="w-4 h-4 ml-1" />
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-800/30 to-emerald-700/30 border-2 border-green-500/40 rounded-2xl p-6 mb-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center border-2 border-yellow-400/50">
                    <TreePine className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Payment Details</p>
                    <p className="text-green-200 text-sm">
                      UPI ID: jharkhand@tourism
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-yellow-400">
                  <Gem className="w-5 h-5 mr-1" />
                  <span className="text-xs font-semibold">Secure</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-600/30 to-orange-600/30 rounded-xl p-4 border-2 border-yellow-500/40">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-yellow-100 text-2xl font-bold">
                      ₹ {totalAmount.toLocaleString()}
                    </p>
                    <p className="text-amber-200 text-sm">Product Purchase</p>
                  </div>
                  <div className="text-right">
                    <Sun
                      className="w-8 h-8 text-yellow-400 animate-spin"
                      style={{ animationDuration: "4s" }}
                    />
                    <p className="text-orange-200 text-xs mt-1">Secure</p>
                  </div>
                </div>
              </div>
            </div>

            {(status || isProcessing) && (
              <div className="mb-6">
                {isProcessing && (
                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-2 border-blue-500/40 rounded-2xl p-6 text-center backdrop-blur-sm">
                    <p className="text-white font-bold text-lg">
                      Processing Payment...
                    </p>
                  </div>
                )}
                {showSuccess && (
                  <div className="bg-gradient-to-r from-green-600/25 to-emerald-600/25 border-2 border-green-500/50 rounded-2xl p-6 text-center animate-fade-in backdrop-blur-sm">
                    <CheckCircle className="w-16 h-16 text-green-400 animate-bounce mx-auto mb-4" />
                    <p className="text-white font-bold text-xl mb-2">
                      Payment Successful!
                    </p>
                    <p className="text-green-400 font-mono text-sm mt-2">
                      TXN ID: JH-PAY-
                      {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </p>
                  </div>
                )}
                {showFailure && (
                  <div className="bg-gradient-to-r from-red-600/25 to-pink-600/25 border-2 border-red-500/50 rounded-2xl p-6 text-center animate-fade-in backdrop-blur-sm">
                    <XCircle className="w-16 h-16 text-red-400 animate-pulse mx-auto mb-4" />
                    <p className="text-white font-bold text-lg">Payment Failed</p>
                  </div>
                )}
              </div>
            )}

            {!isProcessing && (
              <div className="space-y-4">
                {lastAction !== "success" && (
                  <button
                    onClick={() => simulatePayment("success")}
                    className="w-full bg-green-600 text-white py-3 rounded-lg"
                  >
                    Pay Now
                  </button>
                )}
                {lastAction !== "failure" && (
                  <button
                    onClick={() => simulatePayment("failure")}
                    className="w-full bg-red-600 text-white py-3 rounded-lg"
                  >
                    Simulate Failure
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MockUPIPayment;
