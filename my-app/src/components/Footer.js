import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 py-4 pb-20">
      <p className="text-center text-gray-600 text-sm mb-2">
        Created by Retrospective53
      </p>
      <ul className="flex justify-center">
        <li className="mr-6">
          <a
            href="https://github.com/johndoe"
            className="text-blue-500 hover:text-blue-700"
          >
            GitHub
          </a>
        </li>
        <li className="mr-6">
          <a
            href="https://www.linkedin.com/in/johndoe/"
            className="text-blue-500 hover:text-blue-700"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
