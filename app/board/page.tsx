import AuthenticatedLayout from "@/app/layouts/AuthenticatedLayout";
import Workboard from "@/components/Workboard";

export default function BoardPage() {
    return (
        <AuthenticatedLayout>
            <div className="flex-1 flex flex-col gap-20 max-w-full px-3">
                <main className="flex-1 flex flex-col gap-6">
                    <div className="workboard-container">
                        <div className="workboard-columns">
                            <Workboard workboardId={1} />
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}