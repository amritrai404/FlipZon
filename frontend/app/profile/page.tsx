'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Shield } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarFallback className="text-xl">
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">{user?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-gray-700" /> <span className="text-gray-700">Email: </span>
            <span className="text-gray-700">{user?.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-gray-500" /><span className="text-gray-700">Role: </span>
            <span className="text-sm text-gray-700 capitalize">{user?.role}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
