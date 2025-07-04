import { Link } from "react-router-dom";

export default function FileCard({ file }) {
  return (
    <Link to={`/file/${file._id}`}>
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg hover:shadow-purple-500 transition">
        <h3 className="text-xl font-semibold">{file.filename}</h3>
        <p className="text-sm text-gray-400">{file.walletAddress}</p>
        <p className="text-sm mt-1">
          {file.privacy === "public" ? "Public 🔓" : "Private 🔒"}
        </p>
      </div>
    </Link>
  );
}
