import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return {
    navigateTo,
    goToHome: () => navigateTo('/'),
    goToTasks: () => navigateTo('/tasks'),
    goToAIAgents: () => navigateTo('/ai-agents'),
    goToAnalytics: () => navigateTo('/analytics'),
    goToSettings: () => navigateTo('/settings'),
    goToNotifications: () => navigateTo('/notifications'),
  };
};