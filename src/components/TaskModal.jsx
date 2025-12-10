import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";

const priorities = ["Low", "Medium", "High"];
const statuses = ["To-Do", "In-Progress", "Completed"];

export default function TaskModal({
    isOpen,
    onClose,
    onSave,
    onDelete,
    initialTask,
}) {
    const titleRef = useRef(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "Medium",
        status: "To-Do",
        dueDate: "",
    });

    useEffect(() => {
        if (initialTask) {
            setForm({
                title: initialTask.title,
                description: initialTask.description,
                priority: initialTask.priority,
                status: initialTask.status,
                dueDate: initialTask.dueDate
                    ? dayjs(initialTask.dueDate).format("YYYY-MM-DDTHH:mm")
                    : "",
            });
        } else {
            setForm({
                title: "",
                description: "",
                priority: "Medium",
                status: "To-Do",
                dueDate: "",
            });
        }
    }, [initialTask]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => titleRef.current?.focus(), 120);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title.trim()) {
            alert("Title is required");
            return;
        }

        const payload = {
            ...initialTask,
            ...form,
            dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
        };

        onSave(payload);
    };

    return (
        <div
            className="
                fixed inset-0 bg-black/50 backdrop-blur-sm 
                z-[9999] flex items-center justify-center p-4 animate-fadeIn
            "
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className="
                    bg-white/90 backdrop-blur-xl w-full max-w-lg 
                    rounded-xl shadow-2xl p-6 animate-scaleIn 
                    border border-slate-200
                "
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {initialTask ? "Edit Task" : "Add Task"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl leading-none text-slate-500 hover:text-red-600 transition"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-slate-600">Title</label>
                        <input
                            ref={titleRef}
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="
                                w-full border border-slate-300 bg-white rounded-lg 
                                px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none
                            "
                            placeholder="Task title"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-600">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            className="
                                w-full border border-slate-300 bg-white rounded-lg 
                                px-3 py-2 mt-1 resize-none focus:ring-2 focus:ring-blue-500 outline-none
                            "
                            placeholder="Describe the task..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-slate-600">Priority</label>
                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                                className="
                                    w-full border border-slate-300 bg-white rounded-lg 
                                    px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none
                                "
                            >
                                {priorities.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-600">Status</label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="
                                    w-full border border-slate-300 bg-white rounded-lg 
                                    px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none
                                "
                            >
                                {statuses.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-600">Due Date</label>
                        <input
                            type="datetime-local"
                            name="dueDate"
                            value={form.dueDate}
                            onChange={handleChange}
                            className="
                                w-full border border-slate-300 bg-white rounded-lg 
                                px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none
                            "
                        />
                    </div>

                    <div className="flex justify-between items-center pt-3">
                        {initialTask && (
                            <button
                                type="button"
                                onClick={() => {
                                    if (confirm("Are you sure you want to delete this task?")) {
                                        onDelete(initialTask);
                                    }
                                }}
                                className="text-red-600 hover:text-red-800 font-medium"
                            >
                                Delete
                            </button>
                        )}

                        <div className="flex gap-3 ml-auto">
                            <button
                                type="button"
                                onClick={onClose}
                                className="
                                    px-4 py-2 rounded-lg border border-slate-300 
                                    hover:bg-slate-100 transition
                                "
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="
                                    px-5 py-2 rounded-lg bg-blue-600 text-white 
                                    hover:bg-blue-700 transition
                                "
                            >
                                {initialTask ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
