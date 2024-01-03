import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCharacters } from "../services/character";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [nameQuery, setNameQuery] = useState<string>("");
  const navigate = useNavigate();

  const {
    data: characters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["characters", page, nameQuery],
    queryFn: () =>
      getCharacters(page, nameQuery).then((res) => {
        setTotalPages(res.meta.total);
        return res.data;
      }),
  });

  function handleQueryChange(name: string) {
    setPage(1);
    setNameQuery(name);
  }

  function handlePreviousPage() {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  }

  function handleNextPage() {
    if (page < totalPages) {
      setPage((page) => page + 1);
    }
  }

  const showPagination = useMemo(() => {
    return !!characters && characters.length > 0 && !isLoading;
  }, [characters, isLoading]);

  const [nextPageDisabled, prevPageDisabled] = useMemo(() => {
    return [page === totalPages || isLoading, page <= 1 || isLoading];
  }, [page, totalPages, isLoading]);

  return (
    <div className="h-full min-h-screen flex flex-col items-center bg-slate-600 p-4">
      <h1 className="font-sans font-bold text-6xl text-slate-100">
        Rick and Morty
      </h1>
      <div className="flex flex-col mt-8 gap-8 items-start w-[500px] bg-slate-700 p-4 rounded-lg">
        <>
          {isError && <h1>Error fetching characters...</h1>}
          <input
            value={nameQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="w-full h-12 rounded-lg bg-slate-800 text-slate-300 px-4 focus:border-teal-500 focus:outline-none"
            placeholder="Search by name"
          />
          {characters?.map((character) => {
            return (
              <div
                key={character.id}
                onClick={() => navigate(`/${character.id}`)}
                className="flex flex-row items-center gap-4 cursor-pointer"
              >
                <img
                  width={100}
                  height={100}
                  src={character.image}
                  className="w-[100]px h-[100px] rounded-full"
                  alt={`${character.name}'s profile img'`}
                />
                <div className="flex flex-col justify-start items-start">
                  <span className="font-bold text-2xl text-slate-300">
                    {character.name}
                    <span className="text-red-400">
                      {character.deleted ? " (Deleted)" : ""}
                    </span>
                  </span>
                  <span className="font-bold text-md text-slate-400">
                    {character.species}
                  </span>
                </div>
              </div>
            );
          })}
          {characters?.length === 0 && (
            <div className="text-slate-300 text-xl font-sans">
              No characters were found...
            </div>
          )}
        </>
      </div>
      {showPagination && (
        <div className="flex flex-row items-center justify-between bg-slate-800 py-3 px-6 gap-3 w-[500px] mt-2 rounded-xl">
          <button
            onClick={handlePreviousPage}
            className={`text-slate-300  ${
              prevPageDisabled
                ? "cursor-not-allowed"
                : "hover:text-slate-100 cursor-pointer"
            }} `}
            type="button"
            disabled={prevPageDisabled}
          >
            Previous
          </button>
          <span className="text-slate-300">
            {page} / {totalPages}
          </span>
          <button
            className={`text-slate-300 hover:text-slate-100 p-2 ${
              nextPageDisabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={handleNextPage}
            disabled={nextPageDisabled}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
