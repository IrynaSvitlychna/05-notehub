import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox.tsx';
import NoteList from '../NoteList/NoteList.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import NoteModal from '../NoteModal/NoteModal.tsx';
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import { type PaginatedNotesResponse } from "../../services/noteService.ts";
import { fetchNotes } from "../../services/noteService.ts";
import { useDebounce } from "use-debounce";
import { useState } from "react";
import {
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";



export default function App() {

  const [currentQuery, setCurrentQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery] = useDebounce(currentQuery, 500);
  const [isModalOpen, setIsModalOpen] = useState(false); 
 

  const { data, isLoading, isError } = useQuery<
    PaginatedNotesResponse>({
      queryKey: ["notes", currentPage, debouncedSearchQuery],
      queryFn: () => fetchNotes(currentPage, debouncedSearchQuery),
      // enabled: true,
      placeholderData: keepPreviousData,
    });


  const handleSearch = (value: string) => {
    setCurrentQuery(value);
    setCurrentPage(1); 
  };

  return (

    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={currentQuery} onSearch={handleSearch} />
		
        {data && data.totalPages > 1 && (
          <Pagination
          totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button
          className={css.button}
          onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      
      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
      
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      
    </div>
  );
}


