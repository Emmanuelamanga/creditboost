import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AuthenticatedLayout from './Layouts/AuthenticatedLayout';
import { communityService } from '@/services/community.service';

const Communities = () => {
    const [communities, setCommunities] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCommunity, setNewCommunity] = useState({ name: '', description: '' });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCommunities();
    }, [filter]);

    const fetchCommunities = async () => {
        setIsLoading(true);
        try {
            const data = await communityService.getAllCommunities(filter);
            setCommunities(data.communities || []);
        } catch (error) {
            console.error('Error fetching communities:', error);
            setError('Failed to load communities');
            setCommunities([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCommunity = async (e) => {
        e.preventDefault();
        try {
            await communityService.createCommunity(newCommunity);
            setNewCommunity({ name: '', description: '' });
            setIsDialogOpen(false); // Close the dialog
            await fetchCommunities(); // Refresh the communities list
        } catch (error) {
            console.error('Error creating community:', error);
        }
    };

    const handleJoinCommunity = async (communityId) => {
        try {
            await communityService.joinCommunity(communityId);
            await fetchCommunities();
        } catch (error) {
            console.error('Error joining community:', error);
        }
    };

    const filterButtons = [
        { id: 'all', label: 'All', icon: 'mdi:view-grid' },
        { id: 'joined', label: 'Joined', icon: 'mdi:account-group' },
        { id: 'recent', label: 'Recent', icon: 'mdi:clock-outline' },
    ];

    if (isLoading) {
        return (
            <AuthenticatedLayout>
                <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </AuthenticatedLayout>
        );
    }

    if (error) {
        return (
            <AuthenticatedLayout>
                <div className="container mx-auto px-4 py-6">
                    <div className="text-center py-12">
                        <Icon icon="mdi:alert-circle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Error Loading Communities</h3>
                        <p className="text-gray-500 mb-4">{error}</p>
                        <Button onClick={fetchCommunities}>Try Again</Button>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4 py-2">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-3xl font-bold">Credit Score Overview</h1>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <Icon icon="mdi:plus" className="w-5 h-5" />
                                Add Community
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Community</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddCommunity} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                                        Community Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={newCommunity.name}
                                        onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        value={newCommunity.description}
                                        onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
                                        className="w-full p-2 border rounded-md h-32"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Create Community
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex justify-between items-center mb-8">
                    <div className="flex gap-2">
                        {filterButtons.map((btn) => (
                            <Button
                                key={btn.id}
                                variant={filter === btn.id ? 'default' : 'outline'}
                                onClick={() => setFilter(btn.id)}
                                className="flex items-center gap-2"
                            >
                                <Icon icon={btn.icon} className="w-5 h-5" />
                                {btn.label}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(communities) && communities.map((community) => (
                        <div
                            key={community?.id}
                            className="border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold">{community?.name}</h3>
                                    <div className="flex items-center gap-1">
                                        <Icon icon="mdi:star" className="w-5 h-5 text-yellow-400" />
                                        <span>{community?.rating || 0}</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4 line-clamp-2">{community?.description}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Icon icon="mdi:account-group" className="w-5 h-5" />
                                        <span>{community?.member_count || 0} members</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {!community?.is_member && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleJoinCommunity(community.id)}
                                            >
                                                Join
                                            </Button>
                                        )}
                                        <Button
                                            size="sm"
                                            onClick={() => navigate(`/communities/${community.id}`)}
                                        >
                                            View
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {(!Array.isArray(communities) || communities.length === 0) && !isLoading && (
                    <div className="text-center py-12">
                        <Icon icon="mdi:account-group" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Communities Found</h3>
                        <p className="text-gray-500">
                            {filter === 'joined'
                                ? "You haven't joined any communities yet."
                                : "No communities available at the moment."}
                        </p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Communities;