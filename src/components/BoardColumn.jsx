import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function BoardColumn({ title, tasks, onTaskClick }) {
    const titleCount = tasks.reduce((acc, t) => {
        acc[t.title] = (acc[t.title] || 0) + 1;
        return acc;
    }, {});

    const accentColor = {
        "To-Do": "bg-red-400",
        "In-Progress": "bg-amber-400",
        Completed: "bg-green-400",
    }[title];

    return (
        <Droppable droppableId={title}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`rounded-xl shadow-sm border border-slate-200
                        backdrop-blur-sm bg-white/80
                        h-[calc(100vh-190px)] overflow-y-auto transition-all duration-200
                        ${snapshot.isDraggingOver ? "bg-blue-50/70 border-blue-300" : "bg-white/80"}`}
                    style={{
                        touchAction: "manipulation",
                        WebkitOverflowScrolling: "touch"
                    }}
                >
                    <div className={`h-1 w-full rounded-t-xl ${accentColor}`} />

                    <div className="flex justify-between items-center px-3 py-3 border-b bg-white/60 backdrop-blur">
                        <h2 className="font-semibold text-slate-700">{title}</h2>
                        <span className="text-xs text-slate-500 font-medium">{tasks.length}</span>
                    </div>

                    <div className="flex flex-col gap-3 p-3 pb-10">
                        {tasks.length === 0 && (
                            <p className="text-xs text-slate-400 italic text-center py-4">
                                No tasks available
                            </p>
                        )}

                        {tasks.map((task, index) => (
                            <Draggable
                                key={task.id}
                                draggableId={task.id.toString()}
                                index={index}
                            >
                                {(dragprovided, dragSnapshot) => (
                                    <div
                                        ref={dragprovided.innerRef}
                                        {...dragprovided.draggableProps}
                                        {...dragprovided.dragHandleProps}
                                        style={dragprovided.draggableProps.style}
                                        className={`transition-all duration-200 ${dragSnapshot.isDragging
                                            ? "opacity-80 scale-[1.03]"
                                            : "opacity-100"
                                            }`}
                                    >
                                        <TaskCard
                                            task={task}
                                            isDuplicate={titleCount[task.title] > 1}
                                            onClick={onTaskClick}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}

                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
}
