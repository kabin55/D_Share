import PropTypes from "prop-types";

const StatsCard = ({ title, value }) => {
  // Calculate width for the progress bar
  const calculateWidth = () => {
    if (typeof value === "number") {
      return Math.min(100, Math.abs(value));
    }

    if (typeof value === "string") {
      // Handle percentage values (e.g., "45%")
      if (value.includes("%")) {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : Math.min(100, Math.abs(num));
      }

      // Handle growth values (e.g., "+12%")
      if (value.startsWith("+") || value.startsWith("-")) {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : Math.min(100, Math.abs(num));
      }

      // Handle other string values (e.g., "24.5k")
      const num = parseFloat(value);
      return isNaN(num) ? 0 : Math.min(100, Math.abs(num) / 1000); // Scale down large numbers
    }

    return 0;
  };

  // Determine text color based on title and value
  const getTextColor = () => {
    if (title === "weeklyGrowth") {
      return value.startsWith("+") ? "text-green-400" : "text-red-400";
    }
    return "text-blue-400";
  };

  // Format the value for display
  const formatValue = () => {
    if (typeof value === "number") {
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <div
      className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-blue-500"
      data-testid="stats-card"
    >
      <h3 className="text-gray-400 text-sm font-medium capitalize">
        {title.replace(/([A-Z])/g, " $1")}
      </h3>
      <p className={`text-2xl font-bold mt-2 ${getTextColor()}`}>
        {formatValue()}
      </p>
      <div className="mt-auto pt-2">
        <div className="h-1 w-full bg-gray-700 rounded-full">
          <div
            className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{
              width: `${calculateWidth()}%`,
            }}
            aria-label={`Progress: ${calculateWidth()}%`}
          ></div>
        </div>
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default StatsCard;
