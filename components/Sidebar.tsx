import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="w-16 bg-gray-900 h-screen fixed">
      <div className="w-16 h-16 flex items-center justify-center">
        <Image
          src="/assets/sidebar-logo.svg"
          alt="logo"
          width={24}
          height={24}
        />
      </div>
      <div className="absolute top-[104px] text-gray-400">
        <div className="w-16 h-16 flex flex-col gap-[2px] px-[15px] py-[10px] items-center justify-center">
          <Image
            src="/assets/home.svg"
            alt="home-icon"
            width={24}
            height={24}
          />
          <div className="text-xs">Home</div>
        </div>
        <div className="w-16 h-16 flex flex-col gap-[2px] px-[15px] py-[10px] items-center justify-center">
          <Image
            src="/assets/exports-icon.svg"
            alt="home-icon"
            width={24}
            height={24}
          />
          <div className="text-xs">Exports</div>
        </div>
        <div className="w-16 h-16 flex flex-col gap-[2px] px-[15px] py-[10px] bg-gray-700 text-white items-center justify-center">
          <Image
            src="/assets/data-icon.svg"
            alt="home-icon"
            width={24}
            height={24}
          />
          <div className="text-xs">Data</div>
        </div>
        <div className="w-16 h-16 flex flex-col gap-[2px] px-[15px] py-[10px] items-center justify-center">
          <Image
            src="/assets/chatIQ-icon.svg"
            alt="home-icon"
            width={24}
            height={24}
          />
          <div className="text-xs">ChatIQ</div>
        </div>
      </div>
      <div className="absolute bottom-0">
        <div className="w-16 h-16 flex items-center justify-center">
          <Image
            src="/assets/help-icon.svg"
            alt="help icon"
            width={24}
            height={24}
          />
        </div>
        <div>
          <Image
            src="/assets/avatar.svg"
            alt="help icon"
            width={64}
            height={64}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
