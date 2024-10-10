import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const ProtectedComponent: React.FC = () => {
    const { isSignedIn } = useUser();
    const router = useRouter();

    if (!isSignedIn) {
        router.push('/login');
        return <div>Loading...</div>;
    }

    return <div>Protected Content</div>;
};

export default ProtectedComponent;