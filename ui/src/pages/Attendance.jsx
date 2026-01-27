import React from "react";
import api from "../api";
import { useState, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
ModuleRegistry.registerModules([AllCommunityModule]);

const Attendance = () => {
  const [records, SetRecords] = useState([]);


  useEffect(() => {
    api
      .get("attendance")
      .then((res) => {
        console.log(res);
        SetRecords(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="my-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Attendance Records
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {records.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-violet-200 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5 text-violet-800 "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {r.date}
                    </h3>
                    <p className="text-sm text-gray-500">Attendance Record</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-violet-600 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center mr-2">
                      <svg
                        className="w-4 h-4 text-violet-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">Present</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-violet-600 mr-2">
                      {r.present.length}
                    </span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-500 rounded-full"
                        style={{
                          width: `${(r.present.length / (r.present.length + r.absent.length)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-violet-200 flex items-center justify-center mr-2">
                      <svg
                        className="w-4 h-4 text-violet-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">Absent</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-violet-600 mr-2">
                      {r.absent.length}
                    </span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-500 rounded-full"
                        style={{
                          width: `${(r.absent.length / (r.present.length + r.absent.length)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Employees</span>
                    <span className="font-bold text-gray-800">
                      {r.present.length + r.absent.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600">Attendance Rate</span>
                    <span className="font-bold text-violet-600">
                      {Math.round(
                        (r.present.length /
                          (r.present.length + r.absent.length)) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Attendance;
