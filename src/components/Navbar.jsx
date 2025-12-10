export default function Navbar({ onAddTask }) {
    return (
        <nav
            className="
                w-full sticky top-0 z-50
                bg-white/80 backdrop-blur-lg
                border-b border-slate-200
                shadow-sm
                px-6 py-3
                flex justify-between items-center
            "
        >
            <h1 className="text-xl font-bold tracking-tight text-slate-700 select-none">
                Task Manager
            </h1>

            <button
                onClick={onAddTask}
                className="
                    flex items-center gap-2
                    px-4 py-2 
                    bg-blue-600 text-white
                    rounded-md shadow-sm
                    hover:bg-blue-700 
                    active:scale-95
                    transition-all
                "
            >
                <span className="text-lg leading-none">＋</span>
                <span className="hidden sm:inline">Add Task</span>
            </button>
        </nav>
    );
}
