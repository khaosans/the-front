import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';
import Board from "@/components/todo/Board";

interface Params {
    id: string;
}

interface WorkboardPageProps {
    params: Params;
}

const WorkboardPage: React.FC<WorkboardPageProps> = ({ params }) => {
    return (
        <AuthenticatedLayout>
            <Board />
        </AuthenticatedLayout>
    );
};

export default WorkboardPage;
