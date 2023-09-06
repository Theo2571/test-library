import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch as useReduxDispatch, useSelector } from "react-redux";
import { getBookDetails } from "../../redux/BookSlice";
import { AppDispatch, RootState } from "../../redux/store";
import cl from "./DetailBook.module.css";
export const DetailBook: React.FC = () => {
  const { id } = useParams();
  const dispatch = useReduxDispatch<AppDispatch>();
  const navigate = useNavigate();
  const book = useSelector((store: RootState) => store.BookSlice.selectedBook);

  useEffect(() => {
    if (id) {
      dispatch(getBookDetails(id));
    }
  }, [id, dispatch]);
  const goBack = () => {
    navigate(-1);
  };
  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <div className={cl.wrapper}>
        <img className={cl.img} src={book?.imageLinks?.medium} alt="" />
        <div className={cl.blockInfo}>
          <span>{book?.categories && book?.categories.join(", ")}</span>
          <h1>{book?.title}</h1>
          <p>{book?.authors && book?.authors.join(", ")}</p>
          <p>{book?.description}</p>
        </div>
        <div className={cl.toBack}>
          <p className={cl.back} onClick={goBack}>
            Назад
          </p>
        </div>
      </div>
    </div>
  );
};
