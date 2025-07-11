import axios from 'axios'

const API_BASE_URL = `${import.meta.env.VITE_PERFORMANCE_IP}/api`

export const fetchAgents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agents`)
    return response.data.agents
  } catch (error) {
    console.error('Error fetching agents:', error)
    return []
  }
}

export const fetchAgentData = async (agentName) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/agent_data?agent=${agentName}`
    )
    return response.data
  } catch (error) {
    console.error(`Error fetching data for ${agentName}:`, error)
    return null
  }
}
