import { createClient } from '@/utils/supabase/server';
import DashboardPage from "@/app/dashboard/page";

export default async function Page() {
    const supabase = createClient();
    // Use supabase to fetch data or perform actions
    return (
        <div>
            <DashboardPage/>
        </div>
    );
}
