import React, {  } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users } from 'lucide-react';




const LoansList = ({ loans }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Active Loans
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Borrower</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Remaining</TableHead>
              <TableHead>Next Payment</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>{loan.borrower}</TableCell>
                <TableCell>${loan.amount}</TableCell>
                <TableCell>${loan.remainingBalance}</TableCell>
                <TableCell>{loan.nextPayment}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${loan.status === 'Active' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                    }`}>
                    {loan.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LoansList;