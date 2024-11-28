import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';


const RequestLoanModal = ({ isOpen, onClose, maxAmount, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!amount || !purpose) {
      setError('Please fill in all fields');
      return;
    }

    if (parseFloat(amount) > maxAmount) {
      setError(`Amount cannot exceed $${maxAmount}`);
      return;
    }

    onSubmit({
      amount: parseFloat(amount),
      purpose,
      status: 'Pending',
      requestDate: new Date().toISOString(),
    });

    setAmount('');
    setPurpose('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <AlertDialogHeader>
          <DialogTitle>Request New Loan</DialogTitle>
          <DialogDescription>
            Enter loan details below. Maximum amount: ${maxAmount}
          </DialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 pt-4">
          <div>
            <Input
              type="number"
              placeholder="Loan Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Loan Purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit Request</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestLoanModal;