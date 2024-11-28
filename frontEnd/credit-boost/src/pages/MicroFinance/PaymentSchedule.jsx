import React, {  } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from 'lucide-react';


const PaymentSchedule = ({ loan }) => {
  const generateSchedule = () => {
    const schedule = [];
    let balance = loan.amount;
    const monthlyPayment = (loan.amount * (loan.interest / 100 / 12) *
      Math.pow(1 + loan.interest / 100 / 12, loan.term)) /
      (Math.pow(1 + loan.interest / 100 / 12, loan.term) - 1);

    for (let i = 1; i <= loan.term; i++) {
      const interest = balance * (loan.interest / 100 / 12);
      const principal = monthlyPayment - interest;
      balance -= principal;

      schedule.push({
        payment: i,
        date: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        amount: monthlyPayment.toFixed(2),
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: Math.max(0, balance).toFixed(2)
      });
    }
    return schedule;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Payment Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Principal</TableHead>
              <TableHead>Interest</TableHead>
              <TableHead>Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {generateSchedule().map((payment) => (
              <TableRow key={payment.payment}>
                <TableCell>{payment.payment}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>${payment.principal}</TableCell>
                <TableCell>${payment.interest}</TableCell>
                <TableCell>${payment.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PaymentSchedule;