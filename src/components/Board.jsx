import {useState} from 'react'
import { DndContext, closestCorners } from '@dnd-kit/core'
import Column from './Column'
import TaskForm from '../UI/TaskForm'
import useGuest from '../hooks/useGuest'
import useTasks from '../hooks/useTasks'

const COLUMNS = [
    {id: "todo", title: "To Do"},
    {id: "in-progress", title: "In Progress"},
    {id: "in-review", title: "In Review"},
    {id: "done", title: "Done"}
]

function Board() {
    const {user, loading: guestLoading} = useGuest()
    const {tasks, loading: tasksLoading, error, updateTask, createTask, deleteTask} = useTasks(user?.id)
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [editingTask, setEditingTask] = useState(null)

    if(guestLoading || tasksLoading){
        return <p>Loading...</p>
    }
    if(error) {
        return <p>Error: {error}</p>
    }

    function handleDragEnd(event) {
        const {active, over} = event
        if(!over) return;

        updateTask(active.id, {status: over.id})
    }

    function handleEditTask(task) {
        setEditingTask(task)
        setShowTaskForm(true)
    }

    function closeForm() {
        setEditingTask(null)
        setShowTaskForm(false)
    }

    return (
        <>
            <div className='board-toolbar'>
                <button className='create-task-btn' onClick={() => setShowTaskForm(true)}>
                    + New Task
                </button>
            </div>

            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className='board'>
                    {COLUMNS.map((column) => (
                        <Column
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            tasks={tasks.filter((task) => task.status === column.id)}
                            onEdit={handleEditTask}
                            onDelete={deleteTask}
                        />
                    ))}
                </div>
            </DndContext>

            {showTaskForm && (
                <TaskForm 
                    onCreate={createTask} 
                    onCancel={closeForm} 
                    onUpdate={updateTask}
                    existingTask={editingTask}
                />
            )}
        </>
    )
}

export default Board