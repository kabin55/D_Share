import React, { useEffect, useState } from 'react'
import { userActivity } from '../../Data/SampleData.js'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const userRoleData = [
  { name: 'Admin', value: 4 },
  { name: 'User', value: 8 },
  { name: 'Editor', value: 3 },
  { name: 'Moderator', value: 2 },
]

const COLORS = ['#3b82f6', '#10b981', '#facc15', '#ef4444']

// Helper to convert activityData to signupData
const processSignupData = (data) => {
  const counts = data.reduce((acc, item) => {
    const dateKey = new Date(item.createdAt).toISOString().slice(0, 10)
    acc[dateKey] = (acc[dateKey] || 0) + 1
    return acc
  }, {})

  return Object.entries(counts)
    .map(([date, signups]) => ({ date, signups }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
}

const Users = () => {
  const [activityData, setActivityData] = useState([])
  const [signupData, setSignupData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await userActivity()
        setActivityData(data)
        setSignupData(processSignupData(data))
      } catch (err) {
        setError('Failed to load user activity.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleEdit = (userId) => alert(`Edit user with ID: ${userId}`)
  const handleViewActivity = (userId) =>
    alert(`View activity for user with ID: ${userId}`)

  if (loading) return <div className="text-white">Loading activity...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-6">
      {/* User Table */}
      <div className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">
          User Management
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {activityData.map((user) => (
                <tr key={user._id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <img
                      src={user.profilePic || 'https://via.placeholder.com/40'}
                      alt={user.username}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="font-medium text-white">
                      {user.username}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">{user._id}</td>
                  <td className="px-6 py-4 text-gray-400 capitalize">
                    {user.gender || 'Unknown'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-400 hover:text-blue-300 mr-3"
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-gray-400 hover:text-gray-300"
                      onClick={() => handleViewActivity(user._id)}
                    >
                      View Activity
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Activity Display */}
      <div className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Recent User Activity
        </h2>
        <ul className="space-y-2 text-gray-300">
          {activityData.length === 0 ? (
            <li>No recent activity found.</li>
          ) : (
            activityData.map((item) => (
              <li key={item._id}>
                <span className="text-blue-400 font-semibold">
                  {item.username || 'Unknown User'}
                </span>{' '}
                — {item.action || item.activity || 'No action'}{' '}
                <span className="text-sm text-gray-400">
                  ({new Date(item.createdAt).toLocaleString()})
                </span>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Charts */}
      <div className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* New Signups Line Chart */}
        <div className="border border-gray-700 hover:border-blue-500 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-white">New Signups</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={signupData}
              margin={{ top: 10, right: 30, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', borderRadius: 8 }}
              />
              <Legend
                formatter={(value) => (
                  <span className="text-white">{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="signups"
                stroke="#3b82f6"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                animationDuration={800}
                animationEasing="ease-in-out"
                name="New Signups"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Roles Pie Chart */}
        <div className="border border-gray-700 hover:border-blue-500 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-white">User Roles</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={userRoleData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
                animationDuration={800}
              >
                {userRoleData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', borderRadius: 8 }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend
                formatter={(value) => (
                  <span className="text-white">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Users
