import { createClient } from '@/utils/supabase/server';
import DashboardPage from "@/app/dashboard/page";

export default async function Page() {
    return (
        <div>
            <DashboardPage/>
        </div>
    );
}
