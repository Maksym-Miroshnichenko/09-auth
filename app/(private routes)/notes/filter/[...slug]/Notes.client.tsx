'use client';

import css from './NotesPage.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ['notes', query, page, tag],
    queryFn: () => fetchNotes({ query, page, tag }),
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {(data?.totalPages ?? 1) > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages ?? 1}
            onPageChange={(selectedIndex) => setPage(selectedIndex + 1)}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note
        </Link>
      </header>
      <NoteList notes={data?.notes ?? []} />
    </div>
  );
}