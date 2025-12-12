import dayjs from "dayjs";

const priorityColors = {
    Low: "bg-emerald-100 text-emerald-700 border-emerald-300",
    Medium: "bg-amber-100 text-amber-700 border-amber-300",
    High: "bg-red-100 text-red-700 border-red-300"
};

export default function TaskCard({ task, isDuplicate, onClick }) {
    return (
        <div
            onClick={() => onClick(task)}
            className="
                bg-white rounded-lg border border-slate-200 shadow-sm
                hover:shadow-md cursor-pointer
                transition-all duration-200
            "
        >
            <div
                className={`h-1 w-full rounded-t-lg ${task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                    }`}
            />

            <div className="p-3">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-sm text-slate-800 leading-tight line-clamp-1">
                        {task.title}
                    </h3>

                    {isDuplicate && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full ml-2 bg-purple-100 text-purple-700 border border-purple-300">
                            Duplicate
                        </span>
                    )}
                </div>

                {task.description && (
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {task.description}
                    </p>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-xs">
                    <span
                        className={`px-2 py-0.5 rounded-full border ${priorityColors[task.priority]}`}
                    >
                        {task.priority}
                    </span>

                    <span className="text-slate-500">
                        {task.dueDate ? dayjs(task.dueDate).format("DD MMM") : "No due date"}
                    </span>
                </div>
            </div>
        </div>
    );
}
