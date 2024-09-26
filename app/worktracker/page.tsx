import AuthenticatedLayout from '@/app/AuthenticatedLayout';
import WorkTracker from "@/components/worktracker/WorkTracker";
import styles from './page.module.css';

const WorkTrackerPage = () => {
    return (
        <AuthenticatedLayout>
            <div className={styles.workTrackerPage}>
                <h1 className="page-title">Work Tracker</h1>
                <div className={styles.workTrackerContainer}>
                    <WorkTracker />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default WorkTrackerPage;
