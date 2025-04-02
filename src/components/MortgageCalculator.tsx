
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MortgageCalculator = () => {
  const [price, setPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [years, setYears] = useState("30");
  const [interestRate, setInterestRate] = useState("3.5");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMortgage = () => {
    const principal = Number(price) - Number(downPayment);
    const monthlyRate = Number(interestRate) / 100 / 12;
    const numberOfPayments = Number(years) * 12;

    const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))
      / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setMonthlyPayment(monthly);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Swedish Mortgage Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm">Property Price (SEK)</label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="3,000,000"
            />
          </div>
          <div>
            <label className="text-sm">Down Payment (SEK)</label>
            <Input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="600,000"
            />
          </div>
          <div>
            <label className="text-sm">Loan Term (Years)</label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="30"
            />
          </div>
          <div>
            <label className="text-sm">Interest Rate (%)</label>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              step="0.1"
              placeholder="3.5"
            />
          </div>
          <Button onClick={calculateMortgage} className="w-full bg-eco-green hover:bg-eco-green/90">Calculate</Button>
          
          {monthlyPayment && (
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">Monthly Payment</p>
              <p className="text-2xl font-bold text-eco-green">
                {Math.round(monthlyPayment).toLocaleString()} SEK
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MortgageCalculator;
