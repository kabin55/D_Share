export const recentFiles = [
  {
    id: 1,
    name: 'Project_Proposal.pdf',
    sharedBy: 'Alice',
    date: '2023-05-15',
    size: '2.4 MB',
    type: 'document',
    pinned: true,
    downloads: 42,
    views: 128,
    lastAccessed: '2 hours ago',
  },
  {
    id: 2,
    name: 'Budget_Q2.xlsx',
    sharedBy: 'Bob',
    date: '2023-05-10',
    size: '1.8 MB',
    type: 'spreadsheet',
    pinned: false,
    downloads: 35,
    views: 210,
    lastAccessed: '5 hours ago',
  },
  {
    id: 3,
    name: 'Design_Mockups.zip',
    sharedBy: 'Charlie',
    date: '2023-05-05',
    size: '15.2 MB',
    type: 'archive',
    pinned: true,
    downloads: 28,
    views: 175,
    lastAccessed: '1 day ago',
  },
  {
    id: 4,
    name: 'Meeting_Notes.docx',
    sharedBy: 'Dana',
    date: '2023-05-01',
    size: '0.5 MB',
    type: 'document',
    pinned: false,
    downloads: 19,
    views: 92,
    lastAccessed: '2 days ago',
  },
  {
    id: 5,
    name: 'Backend_API_Specs.pdf',
    sharedBy: 'Eve',
    date: '2023-05-18',
    size: '0.8 MB',
    type: 'code',
    pinned: false,
    downloads: 56,
    views: 145,
    lastAccessed: '1 hour ago',
  },
]

export const userActivity = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/users/`
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log('Activity logs fetched:', data)

    return data
  } catch (error) {
    console.error('Failed to fetch user activity:', error)
    return [] // return empty array on failure
  }
}

export const stats = {
  totalFiles: 1243,
  activeShares: 87,
  storageUsed: '45%',
  weeklyGrowth: '+12%',
  apiRequests: '24.5k',
  activeUsers: 143,
}

export const systemPerformance = {
  frontend: {
    responseTime: '128ms',
    pageLoad: '1.4s',
    errors: '0.2%',
    uptime: '99.98%',
  },
  backend: {
    responseTime: '42ms',
    cpuUsage: '28%',
    memoryUsage: '1.8GB/4GB',
    dbQueries: '1.2k/min',
  },
  network: {
    latency: '58ms',
    throughput: '1.4 Gbps',
    packetLoss: '0.01%',
  },
  services: [
    { name: 'API Gateway', status: 'operational', version: '2.4.1' },
    { name: 'Database', status: 'operational', version: 'MongoDB 5.0' },
    { name: 'Cache', status: 'degraded', version: 'Redis 6.2' },
    { name: 'File Storage', status: 'operational', version: 'IPFS 0.12' },
  ],
}

export const users = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/users/`
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log('Activity logs fetched:', data)

    return data
  } catch (error) {
    console.error('Failed to fetch user activity:', error)
    return [] // return empty array on failure
  }
}

export const ipfsStats = {
  totalPinned: 342,
  totalUnpinned: 901,
  networkPeers: 28,
  repoSize: '3.7 GB',
  bandwidthIn: '45.2 MB',
  bandwidthOut: '23.8 MB',
}
