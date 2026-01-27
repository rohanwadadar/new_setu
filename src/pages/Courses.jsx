import { useSearchParams } from "react-router-dom";

export default function Courses() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search");

    return (
        <div className="pt-32 px-4 max-w-7xl mx-auto text-center min-h-[60vh]">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent mb-6">
                Our Courses
            </h1>
            {query ? (
                <p className="text-slate-300">
                    Showing results for: <span className="font-bold text-yellow-500">"{query}"</span>
                </p>
            ) : (
                <p className="text-slate-300 max-w-2xl mx-auto">
                    Explore our comprehensive curriculum designed to take you from beginner to expert in AI.
                </p>
            )}

            <div className="mt-12 p-8 border border-white/10 rounded-2xl bg-white/5 inline-block">
                <p className="text-sm text-slate-400">Course catalog coming soon...</p>
            </div>
        </div>
    );
}
