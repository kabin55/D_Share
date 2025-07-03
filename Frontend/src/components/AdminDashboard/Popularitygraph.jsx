// import React from "react";

// export default function PopularityGraph() {
//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "400px",
//         padding: "20px 0",
//         position: "relative",
//       }}
//     >
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//         Top 5 Popular Files (Last 7 Days)
//       </h2>
//       <div
//         style={{
//           width: "100%",
//           height: "calc(100% - 40px)",
//           backgroundColor: "#f3f4f6",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           borderRadius: "8px",
//           border: "1px solid #e5e7eb",
//         }}
//       >
//         <p>Interactive chart would be displayed here</p>
//         {/* Uncomment this if you have the actual iframe source */}
//         {/* <iframe
//           src="http://localhost:4000/popular_files_interactive.html"
//           style={{
//             width: "100%",
//             height: "100%",
//             border: "none",
//             borderRadius: "8px"
//           }}
//           title="Interactive Popularity Graph"
//           loading="lazy"
//         /> */}
//       </div>
//     </div>
//   );
// }

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

const dummyData = [
  { name: "report.pdf", score: 90 },
  { name: "invoice_2024.xlsx", score: 75 },
  { name: "plan.docx", score: 65 },
  { name: "data.csv", score: 50 },
  { name: "guide.txt", score: 40 },
];

// Assign colors based on score ranges
const getColorByScore = (score) => {
  if (score >= 85) return "#10b981"; // Green
  if (score >= 70) return "#3b82f6"; // Blue
  if (score >= 55) return "#f59e0b"; // Amber
  return "#ef4444"; // Red
};

export default function PopularityGraph() {
  return (
    <div className="w-full h-[450px] p-6 mt-8 rounded-xl bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 shadow-2xl text-white">
      <h2 className="text-center text-2xl font-bold uppercase tracking-wide border-b-2 border-white pb-2 w-fit mx-auto mb-5">
        Top 5 Popular Files (Last 7 Days)
      </h2>
      <div className="bg-gray-100 rounded-lg h-[calc(100%-60px)] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dummyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#4b5563" />
            <YAxis stroke="#4b5563" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                color: "#111827",
              }}
              itemStyle={{ color: "#111827" }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ color: "#1f2937", fontWeight: 500 }}
            />
            <Bar
              dataKey="score"
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
              animationBegin={200}
              isAnimationActive={true}
            >
              {dummyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColorByScore(entry.score)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
