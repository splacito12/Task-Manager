import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

const PRIORITY = {
    low: {label: "Low", color: "#404247", bg: "#caccce"},
    normal: {label: "Normal", color: "#325ab3", bg: "#cde1fa"},
    high: {label: "High", color: "#b82d2d", bg: "#f3dede"},
}

function TaskCard({task, onEdit, onDelete}) {
    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({id: task.id})

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
    }

    const priority = task.priority ? PRIORITY[task.priority] : null

    function handleDelete(e) {
        e.stopPropagation()
        if (window.confirm(`Are you sure you want to delete "${task.title}"?`)){
            onDelete(task.id)
        }
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="task-card"
        >
            <div className="task-action">
                <p className="task-title">{task.title}</p>
                {task.description && (
                    <p className="task-description">{task.description}</p>
                )}
                <div className="task-buttons">
                    <button className='task-edit-btn' onPointerDown={(e) => e.stopPropagation()} onClick={() => onEdit(task)}>Edit</button>
                    <button className="task-delete-btn" onPointerDown={(e) => e.stopPropagation()} onClick={handleDelete}>Delete</button>
                </div>
            </div>

            <div className = "task-meta">
                {priority && (
                    <span className="task-priority" style={{ color: priority.color, background: priority.bg}}>
                        {priority.label}
                    </span>
                )}

                {task.due_date && (
                    <span className="task-due-date">
                        {new Date(task.due_date).toLocaleDateString(undefined, {month: "short", day: "numeric", year: "numeric"})}
                    </span>
                )}
            </div>

        </div>
    )
}

export default TaskCard