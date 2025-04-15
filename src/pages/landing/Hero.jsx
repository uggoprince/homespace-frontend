const Hero = () => (
  <div className="hero page-content">
    <div className="w-full object-none object-center flex flex-col justify-center gap-12">
      <div className="hs-text-center">
        <div className="text-6xl text-primary dark:text-primary2 font-bold font-serif">Find A Space</div>
      </div>
      <div className="hs-text-center flex-grow pb-6">
        <form id="searchForm" method="POST">
          <input
            required
            name="searchText"
            id="homeSearchTextInput"
            placeholder="Address, City, Neighborhood..."
            type="search"
            className="
              border-transparent
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-600
              focus:border-transparent
              py-4 px-4
              rounded-tl rounded-bl
              w-2/5 min-w-min"
          />
          <button
            id="searchButton"
            type="submit"
            className="
            bg-indigo-600
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-purple-600
            focus:ring-opacity-50
            text-white
            py-4 px-6
            rounded-tr
            rounded-br font-bold"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default Hero;
