'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePropertyStore } from "@/stores/propertyStore";

const Hero = () => {
  const setSearch = usePropertyStore((s) => s.setSearch);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchText = formData.get('searchText') as string;
    if (searchText) {
      setSearch(searchText, 0);
    }
  };

  return (
    <div className="hero">
      <div className="w-full object-none object-center flex flex-col justify-center gap-12">
        <div className="hs-text-center">
          <div className="text-5xl md:text-6xl text-primary dark:text-slate-50 font-bold font-serif">Find A Space</div>
        </div>
        <div className="grow my-auto px-16 flex items-center justify-center">
          <form id="searchForm" onSubmit={handleSubmit}
            className="flex items-center w-full max-w-150">
            <Input
              required
              name="searchText"
              // id="homeSearchTextInput"
              placeholder="Address, City, Neighborhood..."
              type="search"
              className="
                flex-1
                border-none
                focus:outline-none
                focus:ring-none
                focus:ring-indigo-600
                focus:border-none
                py-7 px-6
                rounded-l-md
                rounded-r-none
                text-gray-800
                bg-white dark:bg-white"
            />
            <Button
              id="searchButton"
              type="submit"
              className="
              bg-main-600
              hover:bg-main-700
              text-white
              py-7
              px-6
              rounded-l-none
              rounded-r-md
              font-bold
              cursor-pointer w-fit"
            >
                Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;