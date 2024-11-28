import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { transactionsService } from '@/services/transactions.service';
import { useToast } from "@/components/ui/use-toast";

const TransactionsView = ({ uploadId }) => {
    const { toast } = useToast();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0
    });
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        category: 'all',
        minAmount: '',
        maxAmount: '',
        transactionType: 'all',
        search: '',
        sortBy: 'completionTime',
        sortOrder: 'desc'
    });

    const categories = [
        'TRANSFER',
        'MERCHANT_PAYMENT',
        'PAYBILL',
        'RECEIVED',
        'LOAN_REPAYMENT',
        'OVERDRAFT',
        'FULIZA',
        'OTHER'
    ];

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const { transactions: fetchedTransactions, pagination: paginationData } = 
                await transactionsService.getTransactions({
                    ...filters,
                    category: filters.category === 'all' ? '' : filters.category,
                    transactionType: filters.transactionType === 'all' ? '' : filters.transactionType,
                    page: pagination.currentPage,
                    limit: 10,
                    uploadId
                });

            setTransactions(fetchedTransactions);
            setPagination(paginationData);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch transactions. Please try again."
            });
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (uploadId) {
            fetchTransactions();
        }
    }, [filters, pagination.currentPage, uploadId]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-KE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Transactions History</CardTitle>
                    <Button 
                        variant="outline"
                        onClick={fetchTransactions}
                        disabled={loading}
                    >
                        <Icon icon="mdi:refresh" className="w-4 h-4 mr-2" />
                        Refresh
                    </Button>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:items-center mt-4">
                    <Input
                        placeholder="Search transactions..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="max-w-sm"
                    />
                    <div className="flex gap-2">
                        <Select
                            value={filters.category}
                            onValueChange={(value) => handleFilterChange('category', value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category.replace('_', ' ')}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={filters.transactionType}
                            onValueChange={(value) => handleFilterChange('transactionType', value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Transaction Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="credit">Credit</SelectItem>
                                <SelectItem value="debit">Debit</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex gap-4 mt-4">
                    <Input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => handleFilterChange('startDate', e.target.value)}
                        className="max-w-[200px]"
                    />
                    <Input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => handleFilterChange('endDate', e.target.value)}
                        className="max-w-[200px]"
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Date & Time</TableHead>
                                <TableHead>Details</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Type</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">
                                        <div className="flex items-center justify-center gap-2">
                                            <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                                            Loading transactions...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : transactions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">
                                        <div className="flex flex-col items-center gap-2">
                                            <Icon icon="mdi:file-document-outline" className="w-8 h-8 text-muted-foreground" />
                                            <p>No transactions found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                transactions.map((transaction, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{formatDate(transaction.completionTime)}</TableCell>
                                        <TableCell>
                                            <div>{transaction.details}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {transaction.partyInfo.name} {transaction.partyInfo.phoneNumber}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {transaction.category.replace('_', ' ')}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {formatAmount(Math.max(transaction.paidIn, transaction.withdrawn))}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                transaction.paidIn > 0
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {transaction.paidIn > 0 ? 'Credit' : 'Debit'}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                        Showing {transactions.length} of {pagination.totalRecords} transactions
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            disabled={!pagination.hasPrevPage || loading}
                            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                        >
                            <Icon icon="mdi:chevron-left" className="w-4 h-4 mr-2" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            disabled={!pagination.hasNextPage || loading}
                            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                        >
                            Next
                            <Icon icon="mdi:chevron-right" className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default TransactionsView;