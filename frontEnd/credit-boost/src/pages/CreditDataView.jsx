import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { creditDataService } from '@/services/creditData.service';
import AuthenticatedLayout from './Layouts/AuthenticatedLayout';
import { useNavigate } from 'react-router-dom';

const CreditDataView = () => {
    const { toast } = useToast();
    const [creditData, setCreditData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [filters, setFilters] = useState({
        source: 'all',
        status: 'all',
        sortBy: 'uploadedAt',
        sortOrder: 'desc'
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0
    });
    const navigate = useNavigate();

    const fetchCreditData = async () => {
        try {
            setLoading(true);
            const response = await creditDataService.getCreditData({
                page: pagination.currentPage,
                limit: 10,
                source: filters.source === 'all' ? '' : filters.source,
                status: filters.status === 'all' ? '' : filters.status,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder
            });

            if (response.creditData && Array.isArray(response.creditData)) {
                setCreditData(response.creditData);
            }

            if (response.pagination) {
                setPagination(response.pagination);
            } else {
                // Set default pagination if not provided
                setPagination({
                    currentPage: 1,
                    totalPages: 1,
                    totalRecords: response.creditData?.length || 0,
                    hasNextPage: false,
                    hasPrevPage: false
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch credit data"
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await creditDataService.getCreditDataStats();
            setStats(response.stats);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        fetchCreditData();
    }, [filters, pagination.currentPage]);

    useEffect(() => {
        fetchStats();
    }, []);

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPagination(prev => ({
            ...prev,
            currentPage: 1
        }));
    };

    return (
        <AuthenticatedLayout>
             <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold">Transactions</h1>
                <Button 
                    onClick={() => navigate('/credit-score/upload-data')}
                    className="flex items-center gap-2"
                >
                    <Icon icon="mdi:upload" className="w-5 h-5" />
                    Upload New File
                </Button>
            </div>
            <div className="space-y-6">

                {/* Statistics Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Uploads</p>
                                        <h3 className="text-2xl font-bold">{stats.totalUploads}</h3>
                                    </div>
                                    <Icon icon="mdi:file-upload" className="w-8 h-8 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                                        <h3 className="text-2xl font-bold">{formatFileSize(stats.totalStorageUsed)}</h3>
                                    </div>
                                    <Icon icon="mdi:database" className="w-8 h-8 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Latest Upload</p>
                                        <h3 className="text-lg font-bold">{stats.latestUpload ? formatDate(stats.latestUpload) : 'N/A'}</h3>
                                    </div>
                                    <Icon icon="mdi:clock" className="w-8 h-8 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Completed Uploads</p>
                                        <h3 className="text-2xl font-bold">{stats.byStatus?.completed || 0}</h3>
                                    </div>
                                    <Icon icon="mdi:check-circle" className="w-8 h-8 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Credit Data Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Credit Data Files</CardTitle>
                            <Button onClick={() => window.location.href = '/credit-score/upload-data'}>
                                <Icon icon="mdi:upload" className="w-4 h-4 mr-2" />
                                Upload New File
                            </Button>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <Select
                                value={filters.source}
                                onValueChange={(value) => handleFilterChange('source', value)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Source" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Sources</SelectItem>
                                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                                    <SelectItem value="transunion">TransUnion</SelectItem>
                                    <SelectItem value="experian">Experian</SelectItem>
                                    <SelectItem value="equifax">Equifax</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={filters.status}
                                onValueChange={(value) => handleFilterChange('status', value)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="error">Error</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>File Name</TableHead>
                                        <TableHead>Source</TableHead>
                                        <TableHead>Upload Date</TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                                                    Loading credit data...
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : creditData.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8">
                                                <div className="flex flex-col items-center gap-2">
                                                    <Icon icon="mdi:file-document-outline" className="w-8 h-8 text-muted-foreground" />
                                                    <p>No credit data found</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        creditData.map((file) => (
                                            <TableRow key={file.id}>
                                                <TableCell className="font-medium">{file.fileName}</TableCell>
                                                <TableCell>{file.source.toUpperCase()}</TableCell>
                                                <TableCell>{formatDate(file.uploadedAt)}</TableCell>
                                                <TableCell>{formatFileSize(file.fileSize)}</TableCell>
                                                <TableCell>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${file.status === 'completed'
                                                            ? 'bg-green-100 text-green-800'
                                                            : file.status === 'processing'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {file.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm">
                                                                <Icon icon="mdi:dots-vertical" className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => window.location.href = `/credit-score/transactions/${file.id}`}>
                                                                <Icon icon="mdi:eye" className="w-4 h-4 mr-2" />
                                                                View Transactions
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => creditDataService.deleteUpload(file.id).then(fetchCreditData)}>
                                                                <Icon icon="mdi:delete" className="w-4 h-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        {creditData.length > 0 && (
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {creditData.length} of {pagination.totalRecords} items
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
                        )}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>

    );
};

export default CreditDataView;