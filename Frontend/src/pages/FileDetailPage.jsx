import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'

export default function FileDetailPage() {
  const { id } = useParams()
  const [file, setFile] = useState(null)

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/file/${id}`)
        const data = await res.json()
        setFile(data)
      } catch (err) {
        console.error('Failed to fetch file:', err)
      }
    }

    fetchFile()
    window.scrollTo(0, 0)
  }, [id])

  if (!file) return <p className="text-white p-10">File not found</p>

  const ipfsLink = `https://ipfs.io/ipfs/${file.ipfsHash}`

  return (
    <div className="flex bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 p-12 animate-fade-in">
        <div className="bg-gray-900 rounded-xl p-10 shadow-xl border border-gray-700 max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-6 border-b border-gray-700 pb-4">
            {file.filename}
          </h2>
          <div className="space-y-4 text-lg">
            <p>
              <span className="text-gray-400">Wallet Address:</span>{' '}
              <span className="text-purple-400">{file.walletAddress}</span>
            </p>
            <p>
              <span className="text-gray-400">Access:</span>{' '}
              {file.privacy === 'public' ? 'Public 🔓' : 'Private 🔒'}
            </p>
            <p>
              <span className="text-gray-400">Description:</span>{' '}
              {file.description}
            </p>
            <p>
              <span className="text-gray-400">File Type:</span> {file.type}
            </p>
            <p>
              <span className="text-gray-400">Size:</span>{' '}
              {(file.size / 1024).toFixed(2)} KB
            </p>
            <p>
              <span className="text-gray-400">Uploaded:</span>{' '}
              {new Date(file.uploadedAt).toLocaleDateString()}
            </p>
          </div>

          <button
            className="mt-10 px-8 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 transition text-white font-semibold shadow-lg hover:scale-105 transform duration-200"
            onClick={() => {
              const a = document.createElement('a')
              a.href = ipfsLink
              a.target = '_blank'
              a.download = file.filename
              a.click()
            }}
          >
            ⬇️ Download File
          </button>
        </div>
      </div>
    </div>
  )
}
