export default function FilterBar({ filters, setFilters }) {
    return (
        <div
            className="
                bg-white 
                p-4 rounded-lg border border-slate-200 
                flex flex-wrap gap-4 items-center
            "
            style={{
                willChange: "auto",
                transform: "none",
            }}
        >
            <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-medium">Priority</span>

                <select
                    value={filters.priority}
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, priority: e.target.value }))
                    }
                    className="
                        px-3 py-1.5 rounded-lg text-sm border 
                        bg-white shadow-sm
                        focus:ring-2 focus:ring-blue-500 outline-none
                    "
                >
                    <option value="All">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-medium">Status</span>

                <select
                    value={filters.status}
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, status: e.target.value }))
                    }
                    className="
                        px-3 py-1.5 rounded-lg text-sm border 
                        bg-white shadow-sm
                        focus:ring-2 focus:ring-blue-500 outline-none
                    "
                >
                    <option value="All">All</option>
                    <option value="To-Do">To-Do</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-medium">Sort</span>

                <select
                    value={filters.sort}
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, sort: e.target.value }))
                    }
                    className="
                        px-3 py-1.5 rounded-lg text-sm border
                        bg-white shadow-sm
                        focus:ring-2 focus:ring-blue-500 outline-none
                    "
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="closest">Closest Due Date</option>
                </select>
            </div>
        </div>
    );
}
