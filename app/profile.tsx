'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Profile: React.FC = () => {
    return (
        <div className="page-container">
            <div className="card">
                <h1 className="page-title">Profile</h1>
                <p className="page-subtitle">Update your account information</p>
                <form>
                    <Input label="Name" id="name" type="text" placeholder="Your name" />
                    <Input label="Email" id="email" type="email" placeholder="Your email" />
                    <Input label="Password" id="password" type="password" placeholder="New password" />
                    <Button type="submit" className="w-full">Update Profile</Button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
