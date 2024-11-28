import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp } from 'lucide-react';


const calculateLoanViability = (creditScore) => {
  if (creditScore >= 750) return { viable: true, maxAmount: 50000, interest: 8 };
  if (creditScore >= 700) return { viable: true, maxAmount: 25000, interest: 12 };
  if (creditScore >= 650) return { viable: true, maxAmount: 10000, interest: 15 };
  if (creditScore >= 600) return { viable: true, maxAmount: 5000, interest: 18 };
  return { viable: false, maxAmount: 0, interest: 0 };
};

const CreditScoreCheck = ({ onViabilityCheck }) => {
  const [creditScore, setCreditScore] = useState('780');
  const [viability, setViability] = useState(null);

  const checkViability = () => {
    const score = parseInt(creditScore);
    const result = calculateLoanViability(score);
    setViability(result);
    onViabilityCheck(result);
  };

  useEffect(() => {
    const score = parseInt(creditScore);
    const result = calculateLoanViability(score);
    setViability(result);
    onViabilityCheck(result);
  }, []);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Credit Score Check
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="number"
              placeholder="Enter Credit Score"
              value={creditScore}
              disabled
              onChange={(e) => setCreditScore(e.target.value)}
              className="w-full"
            />
            <Button disabled onClick={checkViability}>Check</Button>
          </div>
          {viability && (
            <Alert className={viability.viable ? 'bg-green-50' : 'bg-red-50'}>
              <AlertDescription>
                {viability.viable ? (
                  <div>
                    <p className="font-medium text-green-800">Loan Eligible!</p>
                    <p>Maximum amount: ${viability.maxAmount}</p>
                    <p>Interest rate: {viability.interest}%</p>
                  </div>
                ) : (
                  <p className="font-medium text-red-800">Not eligible for a loan at this time.</p>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditScoreCheck;