import { useState, useEffect } from 'react'
import { supabase } from '../client'

function useGuest() {
    const [guest, setGuest] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function initSession() {
            const {data: {session}} = await supabase.auth.getSession()

             if(session) {
                setGuest(session.user)
                setLoading(false)
                return
            }

            const {data,error} = await supabase.auth.signInAnonymously()
            if(error) {
                console.error('There was an error signing in: ', error.message)
            }else{
                setGuest(data.user)
            }

            setLoading(false)
        }

        initSession()
    }, [])

    return {user: guest, loading}
}

export default useGuest
