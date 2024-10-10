    'use client';

    import React, { useState, useEffect } from 'react'; // Import React
    import { useRouter } from 'next/navigation';
    import AgentDetailView from '@/components/agent-detail-view'; // Ensure this path is correct
    import { Agent } from '@/types';

    // Mock data for agents
    const mockAgents: Agent[] = [
        // ... (mock agents)
        { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40", expertise: "Frontend Development", backstory: "Alice is a frontend developer with a passion for creating beautiful and functional user interfaces.", tools: ["React", "Next.js", "Tailwind CSS"] },
        { id: "2", name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40", expertise: "Backend Development", backstory: "Bob is a backend developer with a passion for creating scalable and secure web applications.", tools: ["Node.js", "Express", "MongoDB"] },
        { id: "3", name: "Charlie Brown", avatar: "/placeholder.svg?height=40&width=40", expertise: "DevOps", backstory: "Charlie is a devops engineer with a passion for creating scalable and secure web applications.", tools: ["Docker", "Kubernetes", "Jenkins"] },
        { id: "4", name: "Diana Prince", avatar: "/placeholder.svg?height=40&width=40", expertise: "UI/UX Design", backstory: "Diana is a ui/ux designer with a passion for creating beautiful and functional user interfaces.", tools: ["Figma", "Adobe XD", "Sketch"] },
    ];

    export default function AgentDetailPage({ params }: { params: { id: string } }) {
        const id = params.id;
        const [agent, setAgent] = useState<Agent | null>(null);
        const [loading, setLoading] = useState(true); // Loading state
        const router = useRouter();

        useEffect(() => {
            const fetchedAgent = mockAgents.find(a => a.id === id) || null;
            setAgent(fetchedAgent);
            setLoading(false); // Set loading to false after fetching
        }, [id]);

        const handleClose = () => {
            router.push('/agent-manager');
        };

        if (loading) {
            return <div className="container mx-auto py-10 text-center">Loading...</div>; // Show loading state
        }

        if (!agent) {
            return <div className="container mx-auto py-10 text-center">Agent not found</div>;
        }

        return (
            <div className="container mx-auto p-4 bg-gray-900 text-white">
                <AgentDetailView agent={agent} isOpen={true} onClose={handleClose} />
            </div>
        );
    }