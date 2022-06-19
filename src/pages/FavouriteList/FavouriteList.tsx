import React, { useEffect } from "react";
import Pagination from "../../components/Paginator/Pagination";
import Character from "../../components/Character/Character";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setCurrentPage } from "../../store/slices/infoSlice";

const FavouriteList = () => {
  const { favourite } = useAppSelector((state) => state.favourite);
  const { currentPage } = useAppSelector((state) => state.info);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  const handlePageChange = (page: number) => dispatch(setCurrentPage(page));
  return (
    <div className="characters">
      <div className="characters__paginator">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          siblingCount={1}
          totalCount={favourite.length}
          pageSize={20}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="characters__content">
        {favourite
          .slice((currentPage - 1) * 20, currentPage * 20)
          .map((character) => (
            <Character key={character.id} character={character} />
          ))}
      </div>
    </div>
  );
};

export default FavouriteList;
