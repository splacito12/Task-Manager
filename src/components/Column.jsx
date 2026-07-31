import { useDroppable } from '@dnd-kit/core'
import TaskCard from '../UI/TaskCard'
import Empty from '../UI/Empty'

function Column({id, title, tasks, onEdit, onDelete}) {
    const {isOver, setNodeRef} = useDroppable({id})

    return (
        <div className={`column ${isOver ? 'over' : ''}`} data-column={id}>
            <header className="column-header">
                <h2>{title}</h2>
                <span className="column-count">{tasks.length}</span>
            </header>

            <div ref={setNodeRef} className="column-body">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
                    ))
                ) : (
                    <Empty message="There are no tasks. Please drag a task here." />
                )}
            </div>
        </div>
    )
}

export default Column