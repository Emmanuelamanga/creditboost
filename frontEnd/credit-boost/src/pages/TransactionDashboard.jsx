import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';
import { creditDataService } from '@/services/creditData.service';
import AuthenticatedLayout from './Layouts/AuthenticatedLayout';
import { toast } from "sonner";
import { format } from 'date-fns';
import { Filter, Download, TrendingUp, TrendingDown, RefreshCcw, Search } from 'lucide-react';
import Pagination, { PerPageSelect } from '@/components/Common/Pagination';

const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-8">
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
                <Card key={i}>
                    <CardHeader className="pb-2">
                        <div className="h-4 bg-muted rounded-full w-24" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-8 bg-muted rounded-full w-32 mb-2" />
                        <div className="h-3 bg-muted rounded-full w-20" />
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Filters Skeleton */}
        <Card>
            <CardContent className="py-4">
                <div className="flex flex-wrap gap-4">
                    <div className="h-10 bg-muted rounded w-[200px]" />
                    <div className="h-10 bg-muted rounded w-[150px]" />
                    <div className="h-10 bg-muted rounded w-[150px]" />
                    <div className="h-10 bg-muted rounded w-[150px]" />
                </div>
            </CardContent>
        </Card>

        {/* Table Skeleton */}
        <Card>
            <CardContent className="p-0">
                <div className="divide-y divide-border">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex space-x-4 p-4">
                            <div className="h-4 bg-muted rounded w-24" />
                            <div className="h-4 bg-muted rounded w-48 flex-1" />
                            <div className="h-4 bg-muted rounded w-24" />
                            <div className="h-4 bg-muted rounded w-32" />
                            <div className="h-4 bg-muted rounded w-24" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
);


const StatsCards = ({ loading, stats, formatAmount }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="pb-2">
                            <div className="animate-pulse h-4 bg-muted rounded-full w-24" />
                        </CardHeader>
                        <CardContent>
                            <div className="animate-pulse">
                                <div className="h-8 bg-muted rounded-full w-32 mb-2" />
                                <div className="h-3 bg-muted rounded-full w-20" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Transactions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stats.totalTransactions}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        In selected period
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Inflow
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-500">
                        {formatAmount(stats.inflow)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Money received
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Outflow
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-500">
                        {formatAmount(stats.outflow)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Money sent
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Net Flow
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${stats.netFlow >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                        {formatAmount(Math.abs(stats.netFlow))}
                    </div>
                    <div className="flex items-center text-xs mt-1">
                        {stats.netFlow >= 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className="text-muted-foreground">
                            Net {stats.netFlow >= 0 ? 'savings' : 'spending'}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};


const TransactionDashboard = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [view, setView] = useState('transactions'); // 'transactions' or 'analytics'
    const { uploadId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);



    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, filter, dateRange]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const [transactionsData, summaryData] = await Promise.all([
                creditDataService.getMpesaTransactions(uploadId),
                creditDataService.getMpesaTransactionSummary(uploadId)
            ]);
            setTransactions(transactionsData);
            setSummary(summaryData);
        } catch (error) {
            toast.error("Failed to fetch transactions");
        } finally {
            setLoading(false);
        }
    };

    const filteredTransactions = useMemo(() => {
        return transactions.filter(transaction => {
            const matchesSearch = transaction.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.partyInfo.name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;

            const matchesFilter = filter === 'all' ||
                (filter === 'sent' && transaction.withdrawn > 0) ||
                (filter === 'received' && transaction.paidIn > 0);

            // Date range filtering logic
            let matchesDate = true;
            const txDate = new Date(transaction.completionTime);
            const now = new Date();

            switch (dateRange) {
                case 'today': {
                    matchesDate = format(txDate, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
                    break;
                }
                case 'week': {
                    const weekAgo = new Date(now.setDate(now.getDate() - 7));
                    matchesDate = txDate >= weekAgo;
                    break;
                }
                case 'month': {
                    const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
                    matchesDate = txDate >= monthAgo;
                    break;
                }
                default:
                    matchesDate = true;
            }

            return matchesSearch && matchesCategory && matchesFilter && matchesDate;
        });
    }, [transactions, searchTerm, selectedCategory, filter, dateRange]);

    const paginatedTransactions = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredTransactions.slice(startIndex, endIndex);
    }, [filteredTransactions, currentPage, pageSize]);

    const transactionStats = useMemo(() => {
        const stats = {
            totalAmount: 0,
            inflow: 0,
            outflow: 0,
            netFlow: 0,
            totalTransactions: filteredTransactions.length,
            categories: {}
        };

        filteredTransactions.forEach(tx => {
            stats.inflow += tx.paidIn || 0;
            stats.outflow += tx.withdrawn || 0;
            stats.categories[tx.category] = (stats.categories[tx.category] || 0) + 1;
        });

        stats.netFlow = stats.inflow - stats.outflow;
        stats.totalAmount = stats.inflow + stats.outflow;

        return stats;
    }, [filteredTransactions]);

    const monthlyData = useMemo(() => {
        const monthly = {};

        filteredTransactions.forEach(tx => {
            const month = format(new Date(tx.completionTime), 'MMM yyyy');
            if (!monthly[month]) {
                monthly[month] = {
                    month,
                    inflow: 0,
                    outflow: 0,
                    net: 0,
                    count: 0
                };
            }
            monthly[month].inflow += tx.paidIn || 0;
            monthly[month].outflow += tx.withdrawn || 0;
            monthly[month].count += 1;
        });

        Object.values(monthly).forEach(data => {
            data.net = data.inflow - data.outflow;
        });

        return Object.values(monthly).sort((a, b) =>
            new Date(a.month) - new Date(b.month)
        );
    }, [filteredTransactions]);


    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Transaction History</h1>
                        <p className="text-muted-foreground">
                            Manage and analyze your M-PESA transactions
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={view === 'transactions' ? 'default' : 'outline'}
                            onClick={() => setView('transactions')}
                        >
                            <Icon icon="mdi:list" className="w-4 h-4 mr-2" />
                            Transactions
                        </Button>
                        <Button
                            variant={view === 'analytics' ? 'default' : 'outline'}
                            onClick={() => setView('analytics')}
                        >
                            <Icon icon="mdi:chart-line" className="w-4 h-4 mr-2" />
                            Analytics
                        </Button>
                        <Button onClick={() => navigate('/credit-score/upload-data')}>
                            <Icon icon="mdi:upload" className="w-4 h-4 mr-2" />
                            Upload New
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                {!uploadId ? (
                    <Card className="mb-8">
                        <CardContent className="py-8 text-center">
                            <div className="flex flex-col items-center gap-4">
                                <Icon icon="mdi:file-upload-outline" className="w-12 h-12 text-muted-foreground" />
                                <h3 className="text-lg font-semibold">No Statement Found</h3>
                                <p className="text-muted-foreground">
                                    Please upload an M-PESA statement to view your transactions
                                </p>
                                <Button onClick={() => navigate('/credit-score/upload-data')}>
                                    Upload Statement
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : loading ? (
                    <LoadingSkeleton />
                ) : (
                    <>
                        <StatsCards loading={loading} stats={transactionStats} formatAmount={formatAmount} />
                        {/* Filters Section */}
                        <Card className="mb-8">
                            <CardContent className="py-4">
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex-1 min-w-[200px] flex items-center gap-4">
                                        <PerPageSelect
                                            pageSize={pageSize}
                                            onPageSizeChange={(newSize) => {
                                                setPageSize(newSize);
                                                setCurrentPage(1);
                                            }}
                                        />
                                        <div className="flex-1">
                                            <Input
                                                placeholder="Search transactions..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full"
                                                icon={<Search className="w-4 h-4" />}
                                            />
                                        </div>
                                    </div>
                                    <Select value={filter} onValueChange={setFilter}>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Filter by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Transactions</SelectItem>
                                            <SelectItem value="sent">Money Sent</SelectItem>
                                            <SelectItem value="received">Money Received</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={dateRange} onValueChange={setDateRange}>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Date range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Time</SelectItem>
                                            <SelectItem value="today">Today</SelectItem>
                                            <SelectItem value="week">Last 7 Days</SelectItem>
                                            <SelectItem value="month">Last 30 Days</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Categories</SelectItem>
                                            {Object.keys(transactionStats.categories).map(category => (
                                                <SelectItem key={category} value={category}>
                                                    {category.replace('_', ' ')}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button variant="outline" onClick={fetchTransactions}>
                                        <RefreshCcw className="w-4 h-4 mr-2" />
                                        Refresh
                                    </Button>
                                    <Button variant="outline">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <AnimatePresence mode="wait">
                            {view === 'transactions' ? (
                                <motion.div
                                    key="transactions"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Transactions Table */}
                                    <Card>
                                        <CardContent className="p-0">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Date</TableHead>
                                                        <TableHead>Description</TableHead>
                                                        <TableHead>Category</TableHead>
                                                        <TableHead>Recipient</TableHead>
                                                        <TableHead className="text-right">Amount</TableHead>
                                                        <TableHead>Type</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {loading ? (
                                                        <TableRow>
                                                            <TableCell colSpan={6} className="text-center py-8">
                                                                <div className="flex justify-center items-center">
                                                                    <Icon
                                                                        icon="mdi:loading"
                                                                        className="w-6 h-6 animate-spin mr-2"
                                                                    />
                                                                    Loading transactions...
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : paginatedTransactions.length === 0 ? (
                                                        <TableRow>
                                                            <TableCell colSpan={6} className="text-center py-8">
                                                                No transactions found
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        paginatedTransactions.map((tx, index) => (
                                                            <TableRow key={tx.id || index}>
                                                                <TableCell>
                                                                    {format(new Date(tx.completionTime), 'MMM dd, yyyy HH:mm')}
                                                                </TableCell>
                                                                <TableCell className="max-w-[300px] truncate">
                                                                    {tx.details}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                                        {tx.category.replace('_', ' ')}
                                                                    </span>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div className="flex flex-col">
                                                                        <span className="font-medium">
                                                                            {tx.partyInfo.name || 'Unknown'}
                                                                        </span>
                                                                        {tx.partyInfo.phoneNumber && (
                                                                            <span className="text-xs text-muted-foreground">
                                                                                {tx.partyInfo.phoneNumber}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    <span className={`font-medium ${tx.paidIn > 0 ? 'text-green-500' : 'text-red-500'
                                                                        }`}>
                                                                        {tx.paidIn > 0
                                                                            ? `+${formatAmount(tx.paidIn)}`
                                                                            : `-${formatAmount(tx.withdrawn)}`
                                                                        }
                                                                    </span>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {tx.paidIn > 0 ? (
                                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                                            Received
                                                                        </span>
                                                                    ) : (
                                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                                                            Sent
                                                                        </span>
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    )}
                                                </TableBody>
                                            </Table>
                                            <Pagination
                                                currentPage={currentPage}
                                                totalItems={filteredTransactions.length}
                                                pageSize={pageSize}
                                                onPageChange={setCurrentPage}
                                                onPageSizeChange={(newSize) => {
                                                    setPageSize(newSize);
                                                    setCurrentPage(1); // Reset to first page when changing page size
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="analytics"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                                >
                                    {/* Monthly Trends Chart */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Monthly Trends</CardTitle>
                                            <CardDescription>
                                                Transaction flow over time
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="h-[400px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={monthlyData}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="month" />
                                                        <YAxis />
                                                        <Tooltip
                                                            formatter={(value) => formatAmount(value)}
                                                            labelFormatter={(label) => `Month: ${label}`}
                                                        />
                                                        <Legend />
                                                        <Bar dataKey="inflow" fill="#22c55e" name="Money In" />
                                                        <Bar dataKey="outflow" fill="#ef4444" name="Money Out" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Net Flow Trend */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Net Flow Trend</CardTitle>
                                            <CardDescription>
                                                Monthly net transaction flow
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="h-[400px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={monthlyData}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="month" />
                                                        <YAxis />
                                                        <Tooltip
                                                            formatter={(value) => formatAmount(value)}
                                                            labelFormatter={(label) => `Month: ${label}`}
                                                        />
                                                        <Legend />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="net"
                                                            stroke="#6366f1"
                                                            name="Net Flow"
                                                            strokeWidth={2}
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Category Distribution */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Transaction Categories</CardTitle>
                                            <CardDescription>
                                                Distribution by category
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {Object.entries(transactionStats.categories).map(([category, count]) => {
                                                    const percentage = (count / transactionStats.totalTransactions) * 100;
                                                    return (
                                                        <div key={category}>
                                                            <div className="flex justify-between mb-1">
                                                                <span className="text-sm font-medium">
                                                                    {category.replace('_', ' ')}
                                                                </span>
                                                                <span className="text-sm text-muted-foreground">
                                                                    {count} transactions
                                                                </span>
                                                            </div>
                                                            <div className="w-full bg-muted rounded-full h-2.5">
                                                                <div
                                                                    className="bg-primary h-2.5 rounded-full"
                                                                    style={{ width: `${percentage}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Transaction Summary */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Transaction Summary</CardTitle>
                                            <CardDescription>
                                                Key metrics and insights
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-sm font-medium mb-2">Transaction Volume</h4>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="bg-muted p-4 rounded-lg">
                                                            <div className="text-2xl font-bold">
                                                                {transactionStats.totalTransactions}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                Total Transactions
                                                            </div>
                                                        </div>
                                                        <div className="bg-muted p-4 rounded-lg">
                                                            <div className="text-2xl font-bold">
                                                                {formatAmount(transactionStats.totalAmount)}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                Total Volume
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-sm font-medium mb-2">Average Transaction</h4>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="bg-muted p-4 rounded-lg">
                                                            <div className="text-2xl font-bold text-green-500">
                                                                {formatAmount(transactionStats.inflow / transactionStats.totalTransactions)}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                Avg. Inflow
                                                            </div>
                                                        </div>
                                                        <div className="bg-muted p-4 rounded-lg">
                                                            <div className="text-2xl font-bold text-red-500">
                                                                {formatAmount(transactionStats.outflow / transactionStats.totalTransactions)}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                Avg. Outflow
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>)}
            </div>
        </AuthenticatedLayout>
    );
};

export default TransactionDashboard;