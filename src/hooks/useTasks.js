import { useState, useEffect } from 'react'
import {supabase} from '../client'

function useTasks(userId) {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if(!userId) return

        async function fetchTasks(){
            setLoading(true)
            const {data, error} = await supabase
                .from('tasks')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', {ascending:true})

            if(error) {
                console.error(error.message)
            }else{
                setTasks(data)
            }
            setLoading(false)
        }

        fetchTasks()

        const channel = supabase
            .channel('tasks')
            .on('postgres_changes', 
                {event: '*', schema: 'public', table: 'tasks', filter: `user_id=eq.${userId}`},
                (payload) => {
                    if(payload.eventType === 'INSERT') {
                        setTasks((prev) => [...prev, payload.new])
                    }else if(payload.eventType === 'UPDATE') {
                        setTasks((prev) => prev.map((task) => (task.id === payload.new.id ? payload.new : task)))
                    }else if(payload.eventType === 'DELETE') {
                        setTasks((prev) => prev.filter((task) => task.id !== payload.old.id))
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [userId])

    async function updateTask(id, updates) {
        const {data, error} = await supabase
            .from('tasks')
            .update(updates)
            .eq('id', id)

        if(error) {
            console.error('Update error: ', error.message)
        }
    }

    async function createTask(newTask) {
        const {data, error} = await supabase
            .from('tasks')
            .insert([{...newTask, user_id: userId}])
        
        if(error) {
            console.error('Failed to create a new task: ', error.message)
        }
    }

    async function deleteTask(id) {
        const {data, error} = await supabase
            .from('tasks')
            .delete()
            .eq('id', id)

        if(error) {
            console.error('Failed to delete: ', error.message)
        }
    }

    return {tasks, loading, error, updateTask, createTask, deleteTask}

}

export default useTasks