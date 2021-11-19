import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import Image from "next/image";

export default function OurNav() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="block h-8 w-auto">
                <Image
                  src="/waterpolo.png"
                  alt="Water Polo"
                  width="32"
                  height="32"
                />
              </div>
              <span>Is there water polo today?</span>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <span>Feedback</span>
            <ArrowNarrowRightIcon className="inline h-5 w-5" />
            <a
              className="text-blue-800"
              href="https://twitter.com/waterpolotoday"
            >
              @waterpolotoday
            </a>
          </div>
        </div>
      </div>
      <div className="block px-4 py-5 sm:hidden sm:flex items-center">
        <span>Feedback</span>
        <ArrowNarrowRightIcon className="inline h-5 w-5" />
        <a className="text-blue-800" href="https://twitter.com/waterpolotoday">
          @waterpolotoday
        </a>
      </div>
    </>
  );
}
