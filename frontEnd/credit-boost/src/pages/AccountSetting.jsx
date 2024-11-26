import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone } from 'lucide-react';
import AuthenticatedLayout from './Layouts/AuthenticatedLayout';

// Profile Page Component
const AccountSetting = () => {
    const [notifications, setNotifications] = useState({
        emailUpdates: true,
        creditScoreChanges: true,
        newLearningContent: false,
        desktopNotifications: true,
        soundNotifications: false
    });

    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">Account Settings</h1>

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="help">Help & Support</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src="/api/placeholder/80/80" alt="Profile" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline">Change Photo</Button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">First Name</label>
                                        <Input defaultValue="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Last Name</label>
                                        <Input defaultValue="Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email</label>
                                        <Input defaultValue="john@example.com" type="email" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Phone</label>
                                        <Input defaultValue="+1 (555) 123-4567" type="tel" />
                                    </div>
                                </div>
                                <Button className="mt-4">Save Changes</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Current Password</label>
                                        <Input type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">New Password</label>
                                        <Input type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Confirm New Password</label>
                                        <Input type="password" />
                                    </div>
                                </div>
                                <Button className="mt-4">Update Password</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="text-sm font-medium">Email Updates</div>
                                            <div className="text-sm text-muted-foreground">Receive updates about your account</div>
                                        </div>
                                        <Switch
                                            checked={notifications.emailUpdates}
                                            onCheckedChange={(checked) =>
                                                setNotifications(prev => ({ ...prev, emailUpdates: checked }))
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="text-sm font-medium">Credit Score Changes</div>
                                            <div className="text-sm text-muted-foreground">Get notified when your credit score changes</div>
                                        </div>
                                        <Switch
                                            checked={notifications.creditScoreChanges}
                                            onCheckedChange={(checked) =>
                                                setNotifications(prev => ({ ...prev, creditScoreChanges: checked }))
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="text-sm font-medium">Desktop Notifications</div>
                                            <div className="text-sm text-muted-foreground">Receive notifications on your desktop</div>
                                        </div>
                                        <Switch
                                            checked={notifications.desktopNotifications}
                                            onCheckedChange={(checked) =>
                                                setNotifications(prev => ({ ...prev, desktopNotifications: checked }))
                                            }
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="help">
                        <Card>
                            <CardHeader>
                                <CardTitle>Help & Support</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="bg-muted p-4 rounded-lg">
                                        <h3 className="font-medium mb-2">Contact Support</h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Our support team is available 24/7 to help you with any questions or concerns.
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <Mail className="h-4 w-4 mr-2" />
                                                <span className="text-sm">support@creditboost.com</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Phone className="h-4 w-4 mr-2" />
                                                <span className="text-sm">1-800-CREDIT-BOOST</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-muted p-4 rounded-lg">
                                        <h3 className="font-medium mb-2">FAQs</h3>
                                        <ul className="space-y-2">
                                            <li>
                                                <button className="text-sm text-left w-full hover:text-primary">
                                                    How do I improve my credit score?
                                                </button>
                                            </li>
                                            <li>
                                                <button className="text-sm text-left w-full hover:text-primary">
                                                    What factors affect my credit score?
                                                </button>
                                            </li>
                                            <li>
                                                <button className="text-sm text-left w-full hover:text-primary">
                                                    How often is my credit score updated?
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>  
        </AuthenticatedLayout>
        
    );
};

export default AccountSetting;