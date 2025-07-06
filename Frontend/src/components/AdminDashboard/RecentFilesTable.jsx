import { FILE_TYPE_ICONS } from "../../Data/Constants";

const RecentFilesTable = ({ files, selectedFile, onSelectFile }) => {
  const getFileTypeIcon = (type) => {
    return FILE_TYPE_ICONS[type] || FILE_TYPE_ICONS.default;
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow border border-gray-700 overflow-hidden">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-semibold text-white">
          Recently Shared Files
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                File
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Shared By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Size
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {files.map((file) => (
              <tr
                key={file.id}
                className={`hover:bg-gray-700 ${
                  selectedFile === file.id ? "bg-gray-700" : ""
                }`}
                onClick={() =>
                  onSelectFile(file.id === selectedFile ? null : file.id)
                }
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="mr-2 text-lg">
                      {getFileTypeIcon(file.type)}
                    </span>
                    <span className="font-medium text-white">{file.name}</span>
                    {file.pinned && (
                      <span className="ml-2 bg-green-500 bg-opacity-20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                        Pinned
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {file.sharedBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {file.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {file.size}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentFilesTable;
