import React, { useState } from "react";
import cl from "./Search.module.css";
import searchImage from "../../assets/search-interface-symbol.png";
import { Main } from "../Main/Main";
import { getBooks, setIsSearch } from "../../redux/BookSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch as useReduxDispatch, useSelector } from "react-redux";
export const Search = () => {
  const dispatch = useReduxDispatch<AppDispatch>();
  const { queryResult, categoryResult, sortResult } =
    useSelector((store: RootState) => store.BookSlice) || {};
  const [query, setQuery] = useState<string>(queryResult);
  const [category, setCategory] = useState<string>(categoryResult);
  const [sort, setSort] = useState<string>(sortResult);
  const handleSearchClick = () => {
    dispatch(
      getBooks({
        query,
        category,
        sort,
        startIndex: 0,
      }),
    );
    dispatch(setIsSearch(true));
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getBooks({
          query,
          category,
          sort,
          startIndex: 0,
        }),
      );
      dispatch(setIsSearch(true));
    }
  };
  return (
    <>
      <div className={cl.wrapper}>
        <h1>Search for books</h1>
        <div className={cl.inputBlock}>
          <input
            className={cl.input}
            type="text"
            placeholder="Search for a book"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <img
            onClick={handleSearchClick}
            className={cl.searchImage}
            src={searchImage}
            alt="lupa"
          />
        </div>
        <div className={cl.selectSearch}>
          <div>
            <label style={{ marginRight: 5 }}>Categories</label>
            <select
              value={category}
              className={cl.select}
              name="Categories"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">all</option>
              <option value="art">art</option>
              <option value="biography">biography</option>
              <option value="computers">computers</option>
              <option value="history">history</option>
              <option value="medical">medical</option>
              <option value="poetry">poetry</option>
            </select>
          </div>
          <div>
            <label style={{ marginRight: 5 }}>Sorting by</label>
            <select
              className={cl.select}
              name="Sorting"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Relevance</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>
      <Main query={query} category={category} sort={sort} />
    </>
  );
};
