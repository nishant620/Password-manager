import React from "react";

const Navbar = () => {
  return (
    // <nav className="bg-slate-800 text-white">
    //   <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">  
    //     <div className="logo font-bold text-white text-2xl">
    //       <span className="text-green-500">&lt;</span>
    //       <span>Pass</span><span className="text-green-500">OP/&gt;</span>
    //     </div>
    //     <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600
    //      text-white font-semibold rounded-full px-5 py-2 shadow-md transition-all
    //       duration-200 active:scale-95">
    //       <img
    //         className="invert w-6 h-6"
    //         src="icons/github.png"
    //         alt="github logo"
    //       />
    //       Github
    //     </button>
    //   </div>
    // </nav>
    <nav className="bg-slate-800 text-white">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-4 md:py-5 gap-3">
    <div className="logo font-bold text-white text-2xl md:text-3xl text-center md:text-left">
      <span className="text-green-500">&lt;</span>
      Pass<span className="text-green-500">OP/&gt;</span>
    </div>

    <button
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600
      text-white font-semibold rounded-full px-5 py-2 shadow-md 
      transition-all duration-200 active:scale-95 w-fit"
    >
      <img
        className="invert w-5 h-5 sm:w-6 sm:h-6"
        src="icons/github.png"
        alt="github logo"
      />
      Github
    </button>
  </div>
</nav>
  );
};

export default Navbar;

