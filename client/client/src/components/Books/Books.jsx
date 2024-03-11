import React, { useContext, useState } from "react";
import Book from "../Book/Book";
import { useGetBooksQuery } from "../../features/api/bookApiSlice";
import { AuthContext } from "../../Context/Context";
import { FidgetSpinner } from "react-loader-spinner";

const Books = () => {
  const [active, setActive] = useState("all");
  const { search, setSearch } = useContext(AuthContext);
  const { data, isLoading, isError, isSuccess, isFetching, refetch } =
    useGetBooksQuery();
  const [filter, setFilter] = useState([]);

  //   featured filter
  const featuredFilter = () => {
    const data3 = data?.filter((book) => book.featured);
    setFilter(data3);
  };
  //   search filter
  const searchFilter = data?.filter((book) =>
    book.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderData = active == "all" ? data : filter;

  let content = null;
  if (isLoading) {
    content = (
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{ margin: "auto" }}
        wrapperClass="fidget-spinner-wrapper"
      />
    );
  }
  if (!isLoading && data?.length > 0) {
    content = (
      <>
        {search.length > 0 ? (
          <>
            {searchFilter?.map((book) => (
              <Book key={book.id} book={book} />
            ))}
          </>
        ) : (
          <>
            {renderData?.map((book) => (
              <Book key={book.id} book={book} />
            ))}
          </>
        )}
      </>
    );
  }
  return (
    <main class="py-12 px-6 2xl:px-6 container">
      <div class="order-2 xl:-order-1">
        <div class="flex items-center justify-between mb-12">
          <h4 class="mt-2 text-xl font-bold">Book List</h4>
          {/* box */}
          {/* <BoxesLoader
            boxColor={"#6366F1"}
            style={{ marginBottom: "20px" }}
            desktopSize={"128px"}
            mobileSize={"80px"}
          /> */}

          {/* box */}
          <div class="flex items-center space-x-4">
            <button
              onClick={() => {
                setActive("all");
              }}
              class={`lws-filter-btn ${active == "all" && " active-filter"} `}
            >
              All
            </button>
            <button
              onClick={() => {
                setActive("featured");
                featuredFilter();
              }}
              class={`lws-filter-btn ${
                active == "featured" && " active-filter"
              }`}
            >
              Featured
            </button>
          </div>
        </div>
        <div class="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {content}

          {/* <!-- Card 1 --> */}
        </div>
      </div>
    </main>
  );
};

export default Books;
