import React, { useEffect, useState } from "react";
import cl from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch as useReduxDispatch, useSelector } from "react-redux";
import { getBooks } from "../../redux/BookSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { LibraryBooks, Props } from "../../types/BooksAPI";
export const Main: React.FC<Props> = ({ query, category, sort }) => {
  const dispatch = useReduxDispatch<AppDispatch>();
  const navigate = useNavigate();

  const LibraryBooks: LibraryBooks | null = useSelector(
    (store: RootState) => store.BookSlice.LibraryBooks,
  );
  const isLoading: boolean = useSelector(
    (store: RootState) => store.BookSlice.loading,
  );
  const [startIndex, setStartIndex] = useState<number>(0);

  useEffect(() => {
    dispatch(
      getBooks({
        query: query,
        category: category,
        sort: sort,
        startIndex,
      }),
    );
  }, [category, sort]);

  const loadMore = () => {
    setStartIndex(startIndex + 30);
    dispatch(
      getBooks({
        query: query,
        category: category,
        sort: sort,
        startIndex: startIndex + 30,
      }),
    );
  };

  const handleClickId = (id: string) => {
    navigate(`book/${id}`);
  };

  return (
    <div className={cl.wrapper}>
      <p className={cl.span}>Found {LibraryBooks?.totalItems} results</p>
      <div className={cl.block}>
        {LibraryBooks?.items?.map((item: any, index: number) => {
          return (
            <div key={`${item.id}-${index}`} className={cl.main}>
              <img
                className={cl.bookImage}
                src={item?.volumeInfo?.imageLinks?.thumbnail}
                alt="book"
              />
              <div className={cl.cardBook}>
                <span className={cl.title}>
                  {item?.volumeInfo?.categories?.[0]}
                </span>
                <h4
                  onClick={() => handleClickId(item?.id)}
                  className={cl.description}
                >
                  {item?.volumeInfo?.title}
                </h4>
                <span className={cl.author}>{item?.volumeInfo?.authors}</span>
              </div>
            </div>
          );
        })}
      </div>
      {isLoading ? (
        <p className={cl.mainMore}>Loading...</p>
      ) : LibraryBooks?.totalItems <= 30 ? (
        <div></div>
      ) : (
        <div className={cl.mainMore}>
          <div className={cl.more} onClick={loadMore}>
            <span>More</span>
          </div>
        </div>
      )}
    </div>
  );
};
