import React, { useState, useEffect } from "react";

const Loader: React.FC = () => {
    const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-2 w-full max-w-max h-max items-center">
        <svg
          className="animate-spin"
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="23"
            cy="23"
            r="20"
            stroke="#F3F4F6"
            strokeWidth="6"
          />
          <path
            d="M23 2.98983C23 1.33859 24.3442 -0.0200001 25.9815 0.194053C29.1734 0.611351 32.2538 1.69571 35.0175 3.38928C38.6341 5.60557 41.5675 8.77882 43.4931 12.5582C45.4188 16.3376 46.2619 20.5759 45.9291 24.8046C45.6748 28.0358 44.7415 31.1653 43.2029 33.9929C42.4137 35.4433 40.5244 35.7323 39.1886 34.7617C37.8527 33.7911 37.584 31.9288 38.3062 30.4439C39.2334 28.5374 39.8002 26.4663 39.9679 24.3354C40.2141 21.2061 39.5903 18.0697 38.1652 15.2729C36.7402 12.4761 34.5695 10.1279 31.8931 8.48778C30.0706 7.37093 28.0619 6.6121 25.9745 6.2416C24.3487 5.95301 23 4.64108 23 2.98983Z"
            fill="#3B82F6"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
