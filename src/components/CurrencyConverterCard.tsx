import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CurrencyConverterCard = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [converted, setConverted] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    setError(null);
    if (!amount || isNaN(Number(amount))) {
      setError("Please enter a valid number");
      return;
    }
    setLoading(true);
    try {
      const base = currency;  // e.g. "USD"
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${base}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch rates");
      }
      const data = await response.json();
      // data.rates is an object with currency → rate
      // We want rate for INR
      const rateToINR = data.rates["INR"];
      if (!rateToINR) {
        throw new Error("INR rate not found");
      }
      const result = parseFloat(amount) * rateToINR;
      setConverted(result);
    } catch (err: any) {
      console.error(err);
      setError("Conversion failed. Try again later.");
      setConverted(null);
    } finally {
      setLoading(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleConvert();
    }
  };

  return (
    <Card className="shadow-card">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Currency Converter
        </h3>
        <div className="space-y-3">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="USD">USD – $</option>
            <option value="EUR">EUR – €</option>
            <option value="GBP">GBP – £</option>
            <option value="JPY">JPY – ¥</option>
            <option value="AUD">AUD – A$</option>
          </select>

          <Button
            className="w-full mt-2"
            onClick={handleConvert}
          >
            Convert to INR
          </Button>

          {converted !== null && (
            <p className="text-sm text-foreground mt-2 font-medium">
              {amount} {currency} ≈{" "}
              <span className="text-accent font-semibold">
                ₹ {converted.toFixed(2)}
              </span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverterCard;
