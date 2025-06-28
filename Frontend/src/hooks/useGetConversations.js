import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useGetConversations = () => {
  const [loading, setLoading] = useState(false)
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    const getConversations = async () => {
      // Get auth token from localStorage
      const authUser = JSON.parse(localStorage.getItem('chat-user'))
      const token = authUser?.token

      // Check if user is authenticated
      if (!token) {
        console.log('No authentication token found')
        return
      }

      setLoading(true)
      try {
        console.log('Fetching conversations from /api/users...')
        const res = await fetch('http://localhost:4000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        console.log('Response status:', res.status)
        const data = await res.json()
        console.log('API Response data:', data)
        if (data.error) {
          throw new Error(data.error)
        }
        setConversations(data)
        console.log('Conversations set:', data)
      } catch (error) {
        console.error('Error fetching conversations:', error)
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    getConversations()
  }, [])

  return { loading, conversations }
}
export default useGetConversations
