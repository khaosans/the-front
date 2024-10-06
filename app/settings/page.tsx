'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        theme: 'light',
        language: 'en',
        notifications_enabled: true,
        model: ''
    })
    const [availableModels, setAvailableModels] = useState<string[]>([])

    //DO NOT REMOVE curl http://localhost:11434/api/tags
    //https://github.com/ollama/ollama/blob/main/docs/api.md#list-local-models
    useEffect(() => {
        // Fetch available models from Ollama API
        const fetchModels = async () => {
            try {
                const response = await fetch('http://localhost:11434/api/tags') // Replace with actual API endpoint
                const data = await response.json()
                setAvailableModels(data.models) // Adjust based on actual API response structure
            } catch (error) {
                console.error('Error fetching models:', error)
            }
        }

        fetchModels()

        // Set default model based on environment
        if (window.location.hostname === 'localhost') {
            setSettings((prev) => ({ ...prev, model: 'llama3.2' }))
        } else {
            setSettings((prev) => ({ ...prev, model: 'gpt-4o-mini' }))
        }
    }, [])

    const handleSaveGeneral = () => {
        toast.success("Your general settings have been updated.")
    }

    const handleModelChange = (value: string) => {
        setSettings({ ...settings, model: value })
        toast.success(`Model changed to ${value}`)
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    <TabsTrigger value="model">Model Config</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>Manage your account settings and preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="theme">Theme</label>
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
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="notifications"
                                    checked={settings.notifications_enabled}
                                    onCheckedChange={(checked: boolean) => setSettings({ ...settings, notifications_enabled: checked })}
                                />
                                <label htmlFor="notifications">Enable notifications</label>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button size="sm" variant="default" onClick={handleSaveGeneral}>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="model">
                    <Card>
                        <CardHeader>
                            <CardTitle>Model Configuration</CardTitle>
                            <CardDescription>Select your preferred AI model.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Select value={settings.model} onValueChange={handleModelChange}>
                                <SelectTrigger>
                                    <SelectValue>{settings.model}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {availableModels.map((model) => (
                                        <SelectItem key={model} value={model}>{model}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your password and account security.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <form onSubmit={(e) => { e.preventDefault(); toast.success("Your password has been successfully updated.") }} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="current-password">Current Password</label>
                                    <input id="current-password" type="password" required className="input" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="new-password">New Password</label>
                                    <input id="new-password" type="password" required className="input" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="confirm-password">Confirm New Password</label>
                                    <input id="confirm-password" type="password" required className="input" />
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
                            <Button size="sm" variant="destructive" onClick={() => { toast.error("Your account has been successfully deleted."); }}>Delete Account</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}