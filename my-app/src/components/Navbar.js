import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "../app/globals.css";

const Nabvar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("#ecf0f3");
  const [linkColor, setLinkColor] = useState("#1f2937");
  // const router = useRouter();

  // useEffect(() => {
  //   if (router.asPath === "/blog" || router.asPath === "/dungeon") {
  //     setNavBg("transparent");
  //     setLinkColor("#ecf0f3");
  //   } else {
  //     setNavBg("#ecf0f3");
  //     setLinkColor("#1f2937");
  //   }
  // }, [router]);

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div
      style={{ backgroundColor: `${navBg}` }}
      className={
        shadow
          ? "fixed w-full h-20 shadow-xl z-[100]"
          : "fixed w-full h-20 z-[100]"
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <Link href="/">
          <Image src="/assets/Logo.jpg" alt="/" width="200" height="100" />
        </Link>
        <div>
          <ul style={{ color: `${linkColor}` }} className="hidden md:flex">
            <Link href="/" scroll={false}>
              <li className="ml-10 text-sm uppercase hover:border-b">Home</li>
            </Link>
            <Link href="/" scroll={false}>
              <li className="ml-10 text-sm uppercase hover:border-b">
                Library
              </li>
            </Link>
            <Link href="/upload" scroll={false}>
              <li className="ml-10 text-sm uppercase hover:border-b">Upload</li>
            </Link>
            <Link href="/" scroll={false}>
              <li className="ml-10 text-sm uppercase hover:border-b">
                Projects
              </li>
            </Link>
            <Link href="/login" scroll={false}>
              <li className="ml-10 text-sm uppercase hover:border-b">
                Profile
              </li>
            </Link>
          </ul>
          <div onClick={handleNav} className="md:hidden hover:cursor-pointer">
            LOL MQ
          </div>
        </div>
      </div>

      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 "
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <Link href="/">
                {/* <Image
                  src="/../public/assets/navLogo.png"
                  width="30"
                  height="5"
                  alt="/"
                /> */}
                wowee
              </Link>
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              >
                Close
              </div>
            </div>
            <div className="border-b border-gray-300 my-4 ">
              <p className="w-[86%] md:w-[90%] py-4">
                Let&apos;s do something together
              </p>
            </div>
            <div className="py-4 flex-col">
              <ul className="uppercase">
                <Link onClick={() => setNav(false)} href="/" scroll={false}>
                  <li className="py-4 text-sm">Home</li>
                </Link>
                <Link onClick={() => setNav(false)} href="/" scroll={false}>
                  <li className="py-4 text-sm">About</li>
                </Link>
                <Link onClick={() => setNav(false)} href="/" scroll={false}>
                  <li className="py-4 text-sm">Skills</li>
                </Link>
                <Link onClick={() => setNav(false)} href="/" scroll={false}>
                  <li className="py-4 text-sm">Projects</li>
                </Link>
                <Link onClick={() => setNav(false)} href="/" scroll={false}>
                  <li className="py-4 text-sm">Music</li>
                </Link>
              </ul>
              <div className="pt-16">
                <p className="uppercase tracking-widest text-[#5651e5]">
                  Let&apos;s connect
                </p>
                <div className="flex items-center justify-between w-full sm:w-[80%]">
                  <a
                    href="https://www.linkedin.com/in/harry-pamungkas-9aa6801a5/"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                      Li
                    </div>
                  </a>
                  <a
                    href="https://github.com/Retrospective53"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                      GH
                    </div>
                  </a>
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    Mail
                  </div>
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    Fill
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nabvar;
