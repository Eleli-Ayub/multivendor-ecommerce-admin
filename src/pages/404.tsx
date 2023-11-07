// 404.tsx
import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <img
        src="/path/to/your/image.png"
        alt="404 Error"
        className="mt-8 max-w-sm"
      />
      <a href="/" className="text-blue-500 mt-4 hover:underline">
        Go back to the homepage
      </a>
    </div>
  );
};

export default NotFoundPage;
