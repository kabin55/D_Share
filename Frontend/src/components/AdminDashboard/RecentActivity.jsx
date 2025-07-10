import { ACTION_ICONS } from "../../Data/Constants";

const RecentActivity = ({ activities }) => {
  const getActionIcon = (actionType) => {
    return ACTION_ICONS[actionType] || ACTION_ICONS.default;
  };

  const isValidArray = Array.isArray(activities);

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Recent Activity</h2>

      {isValidArray && activities.length > 0 ? (
        <ul className="divide-y divide-gray-700">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="py-3 hover:bg-gray-700 transition-colors duration-200 px-2 rounded"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 bg-blue-500 bg-opacity-20 p-2 rounded-full">
                  <span className="text-blue-400">
                    {getActionIcon(activity.actionType)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {activity.user}{" "}
                    <span className="text-gray-400">{activity.action}</span>{" "}
                    {activity.file}
                  </p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No recent activity found.</p>
      )}
    </div>
  );
};

export default RecentActivity;
