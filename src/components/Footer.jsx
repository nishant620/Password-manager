import React from "react";

const Footer = () => {
  return (
    // <footer className="bg-slate-900 text-white flex flex-col items-center py-1 border-t border-slate-700 shadow-inner px-4 md:px-8">
    //   {/* Logo */}
    //   <div className="logo font-bold text-2xl md:text-3xl mb-1 tracking-tight text-center">
    //     <span className="text-green-500">&lt;</span>
    //     Pass<span className="text-green-500">OP/&gt;</span>
    //   </div>

    //   {/* Creator Info */}
    //   <p className="text-slate-400 text-sm md:text-base text-center">
    //     Created with 💚 by{" "}
    //     <span className="text-green-400 font-medium">Nishant</span>
    //   </p>

    //   {/* Copyright */}
    //   <p className="text-slate-500 text-xs md:text-sm mt-2 text-center">
    //     © {new Date().getFullYear()} PassOP. All rights reserved.
    //   </p>
    // </footer>
    <footer className="bg-slate-900 text-white flex flex-col items-center py-4 px-4 md:px-8 border-t border-slate-700 shadow-inner text-center space-y-1">
      <div className="logo font-bold text-2xl md:text-3xl">
        <span className="text-green-500">&lt;</span>
        Pass<span className="text-green-500">OP/&gt;</span>
      </div>
      <p className="text-slate-400 text-sm md:text-base">
        Created with 💚 by{" "}
        <span className="text-green-400 font-medium">Nishant</span>
      </p>
      <p className="text-slate-500 text-xs md:text-sm">
        © {new Date().getFullYear()} PassOP. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
