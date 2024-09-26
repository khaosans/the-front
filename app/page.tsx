import { createClient } from '@/utils/supabase/server';

export default async function Page() {
    const supabase = createClient();
    // Use supabase to fetch data or perform actions
    return (
        <div>
            {/* Your component JSX */}
        </div>
    );
}
