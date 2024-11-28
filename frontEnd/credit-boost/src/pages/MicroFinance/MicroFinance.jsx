import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus } from 'lucide-react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import LoanCalculator from './LoanCalculator';
import CreditScoreCheck from './CreditScoreCheck';
import LoansList from './LoansList';
import PaymentSchedule from './PaymentSchedule';
import RequestLoanModal from './RequestLoanModal';

// TODO: fetch from api 
const initialLoans = [
  {
    id: 1,
    borrower: "Jane Doe",
    amount: 1000,
    interest: 5,
    term: 12,
    status: "Active",
    remainingBalance: 850,
    nextPayment: "2024-12-15"
  }
];

const MicroFinance = () => {
  const [loans, setLoans] = useState(initialLoans);
  const [calculationResult, setCalculationResult] = useState(null);
  const [loanViability, setLoanViability] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [loanRequests, setLoanRequests] = useState([]);

  const handleCalculation = (result) => {
    setCalculationResult(result);
  };

  const handleViabilityCheck = (result) => {
    setLoanViability(result);
  };

  const handleLoanRequest = (request) => {
    setLoanRequests(prev => [...prev, {
      id: Date.now(),
      ...request
    }]);
  };

  return (
    <AuthenticatedLayout>
      <div className="mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Microfinance Dashboard</h1>
          <Button
            onClick={() => setIsRequestModalOpen(true)}
            disabled={!loanViability?.viable}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Request Loan
          </Button>
        </div>

        <CreditScoreCheck onViabilityCheck={handleViabilityCheck} />

        <RequestLoanModal
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          maxAmount={loanViability?.maxAmount || 0}
          onSubmit={handleLoanRequest}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <LoanCalculator onCalculate={handleCalculation} />
            {calculationResult && (
              <Alert>
                <AlertDescription>
                  <div className="space-y-2">
                    <p>Monthly Payment: ${calculationResult.monthlyPayment}</p>
                    <p>Total Payment: ${calculationResult.totalPayment}</p>
                    <p>Total Interest: ${calculationResult.totalInterest}</p>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loanRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>${request.amount}</TableCell>
                        <TableCell>{request.purpose}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <LoansList loans={loans} />
          </div>
        </div>

        {loans.map(loan => (
          <PaymentSchedule key={loan.id} loan={loan} />
        ))}
      </div>
    </AuthenticatedLayout>

  );
};

export default MicroFinance;