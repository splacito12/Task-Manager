import {useState} from 'react'

function TaskForm({onCreate, onCancel, onUpdate, existingTask}) {
    const isEditing = Boolean(existingTask)

    const [title, setTitle] = useState(existingTask ? existingTask.title : '')
    const [priority, setPriority] = useState(existingTask ? existingTask.priority : 'normal')
    const [dueDate, setDueDate] = useState(existingTask ? existingTask.due_date : '')
    const [description, setDescription] = useState(existingTask ? existingTask.description : '')

    function handleSubmit(e) {
        e.preventDefault()
        if(!title.trim()) return

        const newTask = {
            title: title.trim(), priority, due_date: dueDate || null, status: 'todo', description: description.trim() || null
        }

        if(isEditing) {
            onUpdate(existingTask.id, newTask)
        }else{
            onCreate(newTask)
        }

        setTitle('')
        setPriority('normal')
        setDueDate('')

        onCancel()
    }

    return (
        <div className="task-form-overlay">
            <form className="task-form" onSubmit={handleSubmit}>
                <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>

                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="priority">Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value='normal'>Normal</option>
                    <option value='high'>High</option>
                </select>

                <label htmlFor='dueDate'>Due Date</label>
                <input
                    type='date'
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                <label htmlFor='description'>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                />

                <div className='task-form-actions'>
                    <button type='submit' onClick={handleSubmit}>Create Task</button>
                    <button type='button' onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )

}

export default TaskForm