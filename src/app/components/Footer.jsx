import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-[#E5ECE5] bg-white px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <h2 className="text-lg text-gray-500">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </h2>

        <h2 className="text-lg text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
