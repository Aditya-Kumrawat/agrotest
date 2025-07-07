import React from "react";

export default function Header() {
  return (
    <header className="bg-white border-b border-agro-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo for mobile/alternate view */}
        <div className="flex items-center gap-4 lg:hidden">
          <div className="flex">
            <svg
              width="16"
              height="16"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.6087 8.1912C3.57343 7.96087 4.74147 7.8261 6 7.8261C7.25853 7.8261 8.42657 7.96087 9.3913 8.1912C10.3048 8.40927 11.3322 8.9223 11.7854 9.2784L6.28287 0.45363C6.15237 0.244343 5.84763 0.244343 5.71713 0.45363L0.21458 9.2784C0.66777 8.9223 1.6952 8.40927 2.6087 8.1912Z"
                fill="#121714"
              />
            </svg>
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.4809 0.33333 10.913C0.33333 10.6242 0.43088 10.3641 0.497737 10.2131C0.534583 10.1299 0.57116 10.0601 0.598957 10.0104C0.612993 9.9852 0.625157 9.9645 0.6345 9.94903C0.63918 9.94127 0.64318 9.93477 0.646387 9.92963L0.648873 9.92567L0.650593 9.92293ZM10.9956 8.668L7 2.25999L3.00437 8.668C3.15537 8.6203 3.30597 8.57807 3.4539 8.54273C4.47603 8.2987 5.6967 8.15943 7 8.15943C8.3033 8.15943 9.52397 8.2987 10.5461 8.54273C10.694 8.57807 10.8446 8.6203 10.9956 8.668Z"
                fill="#0D1A12"
              />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-agro-text-primary">
            AgroSaarthi
          </h1>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-xl font-semibold text-agro-text-primary">
            Dashboard
          </h2>
        </div>

        {/* User actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </button>
          <div className="w-8 h-8 bg-agro-primary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">U</span>
          </div>
        </div>
      </div>
    </header>
  );
}