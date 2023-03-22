import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 py-4 pb-20">
      <p className="text-center text-gray-600 text-sm mb-2">
        Created by Retrospective53
      </p>
      <ul className="flex justify-center">
        <li className="mr-6">
          <Link
            href="https://github.com/Retrospective53"
            className="text-blue-500 hover:text-blue-700"
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub
          </Link>
        </li>
        <li className="mr-6">
          <Link
            href="https://www.linkedin.com/in/harry-pamungkas-9aa6801a5/"
            className="text-blue-500 hover:text-blue-700"
            rel="noreferrer noopener"
            target="_blank"
          >
            LinkedIn
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
