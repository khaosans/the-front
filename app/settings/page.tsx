'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import toast from   'react-hot-toast';
import { User, Mail, Lock, Bell, HelpCircle, Send } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://github.com/shadcn.png',
    role: 'Developer',
    bio: 'Passionate about building great software.',
  })

  const handleUpdateProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const updatedUser = {
      ...user,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      bio: formData.get('bio') as string,
    }
    setUser(updatedUser)
    toast.success("Profile updated successfully.")
  }

  const handleChangePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Implement password change logic here
    toast.success("Password changed successfully.")
  }

  const handleDeleteAccount = () => {
    // Implement account deletion logic here
    toast.success("Account deleted successfully.")
    router.push('/')
  }

  const handleSupportSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Implement support request submission logic here
    toast.success("Support request submitted successfully.")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Profile Settings & Support</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile details here.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Avatar</Button>
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" name="name" defaultValue={user.name} required />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" defaultValue={user.email} required />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="role">Role</Label>
                    <Input type="text" id="role" name="role" defaultValue={user.role} />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" name="bio" defaultValue={user.bio} />
                  </div>
                </div>
                <Button type="submit" className="mt-4">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Change Password</h3>
                <form onSubmit={handleChangePassword}>
                  <div className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input type="password" id="current-password" name="currentPassword" required />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input type="password" id="new-password" name="newPassword" required />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input type="password" id="confirm-password" name="confirmPassword" required />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">Change Password</Button>
                </form>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Delete Account</h3>
                <p className="text-sm text-muted-foreground mb-2">Once you delete your account, there is no going back. Please be certain.</p>
                <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch id="email-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                </div>
                <Switch id="push-notifications" />
              </div>
              <div>
                <Label htmlFor="notification-frequency">Notification Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Support</CardTitle>
              <CardDescription>Get help and support for your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I create a new project?</AccordionTrigger>
                  <AccordionContent>
                    To create a new project, go to the Projects page and click on the "New Project" button. Fill in the project details and click "Create".
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How can I invite team members?</AccordionTrigger>
                  <AccordionContent>
                    You can invite team members by going to the Team page, clicking on "Invite Member", and entering their email address.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    To reset your password, go to the login page and click on "Forgot Password". Follow the instructions sent to your email to create a new password.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="support-subject">Subject</Label>
                    <Input type="text" id="support-subject" name="subject" required />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="support-message">Message</Label>
                    <Textarea id="support-message" name="message" required />
                  </div>
                  <Button type="submit">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}