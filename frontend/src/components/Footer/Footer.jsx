// eslint-disable-next-line no-unused-vars
import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                COOK
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Links" />
              <Footer.LinkGroup col>
                <Footer.Link href="" target="_blank" rel="noopener noreferrer">
                  Recipes
                </Footer.Link>
                <Footer.Link href="" target="_blank" rel="noopener noreferrer">
                  About Us
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  COOK
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="legal & Support" />
              <Footer.LinkGroup col>
                <Footer.Link href="" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </Footer.Link>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">FAQs</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Download the App" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download on Google Play
                </Footer.Link>
                <Footer.Link
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download on the App Store
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="COOK"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterComponent;
