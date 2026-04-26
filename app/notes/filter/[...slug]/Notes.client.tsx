'use client';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import css from './Notes.client.module.css';
import Loader from '@/app/loading';
import Link from 'next/link';

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [perPage] = useState(12);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag, page, query],
    queryFn: () => fetchNotes(query, page, perPage, tag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 0;

  function handleChangePage(newPage: number) {
    setPage(newPage);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchText={query} updateSearch={debouncedSearch} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={handleChangePage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <Loader />}

      {data && data.notes.length > 0 && !isError && (
        <NoteList notes={data.notes} />
      )}
    </div>
  );
}
