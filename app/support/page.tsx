'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordian"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Search, Mail } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [faqs] = useState<FAQ[]>([
    {
      question: "How do I create a new task?",
      answer: "To create a new task, navigate to the Tasks page and click on the 'Add Task' button. Fill in the required details such as title, description, and due date, then click 'Save'."
    },
    {
      question: "Can I assign tasks to other team members?",
      answer: "Yes, you can assign tasks to other team members. When creating or editing a task, you'll see an 'Assignee' field where you can select the team member you want to assign the task to."
    },
    {
      question: "How do I change the status of a task?",
      answer: "To change the status of a task, go to the task details page and look for the 'Status' dropdown. Select the new status from the options provided (e.g., 'To Do', 'In Progress', 'Done') and the change will be saved automatically."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, we don't have a dedicated mobile app. However, our web application is fully responsive and can be accessed through your mobile device's web browser for a seamless experience on the go."
    },
    {
      question: "How can I create a new project?",
      answer: "To create a new project, go to the Projects page and click on the 'New Project' button. Fill in the project details such as name, description, and team members, then click 'Create Project'."
    },
  ])

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <Textarea id="message" placeholder="How can we help you?" />
                </div>
                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
