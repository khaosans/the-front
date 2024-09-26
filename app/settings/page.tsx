'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ThemeColor, setTheme, getStoredTheme, themeColors } from '@/lib/theme';

export default function SettingsPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    notifications_enabled: true,
    themeColor: 'blue' as ThemeColor,
  })

  useEffect(() => {
    const fetchSettings = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', user.id)
          .single()
        if (data) {
          setSettings({ ...data, themeColor: getStoredTheme() })
        }
      }
    }
    fetchSettings()
  }, [supabase])

  const handleSaveGeneral = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { error } = await supabase
        .from('user_settings')
        .upsert({ user_id: user.id, ...settings })

      if (error) {
        console.error('Error updating settings:', error)
        toast.error("Failed to update settings. Please try again.")
      } else {
        setTheme(settings.themeColor)
        toast.success("Your general settings have been updated.")
      }
    }
  }

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle password change
    console.log('Changing password')
    toast.success("Your password has been successfully updated.")
  }

  const handleDeleteAccount = () => {
    // Here you would typically handle account deletion
    console.log('Deleting account')
    toast.error("Your account has been successfully deleted.")
    router.push('/login')
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={settings.theme} onValueChange={(value) => setSettings({ ...settings, theme: value })}>
                  <SelectTrigger id="theme">
                    <SelectValue>{settings.theme}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
                  <SelectTrigger id="language">
                    <SelectValue>{settings.language}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="notifications"
                  checked={settings.notifications_enabled}
                  onCheckedChange={(checked: boolean) => setSettings({ ...settings, notifications_enabled: checked })}
                />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="themeColor">Theme Color</Label>
                <Select value={settings.themeColor} onValueChange={(value: ThemeColor) => setSettings({ ...settings, themeColor: value })}>
                  <SelectTrigger id="themeColor">
                    <SelectValue>{settings.themeColor}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(themeColors).map(([color, hex]) => (
                      <SelectItem key={color} value={color}>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: hex }}></div>
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="default" onClick={handleSaveGeneral}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSavePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
                <Button size="sm" variant="default" type="submit">Change Password</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Manage advanced settings for your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Delete Account</h3>
                <p className="text-sm text-muted-foreground">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
              </div>
              <Button size="sm" variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
