import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button";
import api from '@/api/privateInstance';
import AuthenticatedLayout from './Layouts/AuthenticatedLayout';
import { communityService } from '@/services/community.service';

const CommunityPage = () => {
    const { id } = useParams();
    const [community, setCommunity] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchCommunityDetails();
        fetchMessages();
        const interval = setInterval(fetchMessages, 10000);
        return () => clearInterval(interval);
    }, [id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchCommunityDetails = async () => {
        try {
            const response = await communityService.getCommunityById(id);
            setCommunity(response);
        } catch (error) {
            console.error('Error fetching community details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await communityService.getCommunityMessages(id);
            setMessages(response.messages || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            await communityService.sendMessage(id, newMessage);
            setNewMessage('');
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    if (isLoading) {
        return (
            <AuthenticatedLayout>
                <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">{community?.name}</h1>
                            <p className="text-gray-600 mb-4">{community?.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Icon icon="mdi:account-group" className="w-5 h-5" />
                                    <span>{community?.member_count || 0} members</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icon icon="mdi:star" className="w-5 h-5" />
                                    <span>{community?.rating || 0} rating</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Section */}
                <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-20rem)]">
                    <div className="flex flex-col h-full">
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-3 mb-4 ${message.is_own ? 'justify-end' : 'justify-start'
                                        }`}
                                >
                                    {!message.is_own && (
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                            <Icon icon="mdi:account" className="w-5 h-5 text-gray-500" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[70%] p-3 rounded-lg ${message.is_own
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100'
                                            }`}
                                    >
                                        {!message.is_own && (
                                            <p className="text-xs font-medium mb-1">
                                                {message.user_name}
                                            </p>
                                        )}
                                        <p className="text-sm">{message.content}</p>
                                        <p className="text-xs text-right mt-1 opacity-70">
                                            {new Date(message.timestamp).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    {message.is_own && (
                                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                            <Icon icon="mdi:account" className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <form onSubmit={handleSendMessage} className="p-4 border-t">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 p-2 border rounded-md"
                                />
                                <Button type="submit" disabled={!newMessage.trim()}>
                                    <Icon icon="mdi:send" className="w-5 h-5" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CommunityPage;