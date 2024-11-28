import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp } from 'lucide-react';


const LoanCalculator = ({ onCalculate }) => {
    const [amount, setAmount] = useState('');
    const [term, setTerm] = useState('');
    const [interest, setInterest] = useState('');
  
    const calculateLoan = () => {
      const principal = parseFloat(amount);
      const monthlyRate = parseFloat(interest) / 100 / 12;
      const numberOfPayments = parseFloat(term);
  
      const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
      const totalPayment = monthlyPayment * numberOfPayments;
  
      onCalculate({
        principal,
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: (totalPayment - principal).toFixed(2)
      });
    };
  
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Input
                type="number"
                placeholder="Loan Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Term (months)"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Interest Rate (%)"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={calculateLoan}>Calculate</Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  export default LoanCalculator;