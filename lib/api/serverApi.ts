import { cookies } from 'next/headers';
import { api } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import type { SearchResponse } from './clientApi';

type FetchParams = {
  query: string;
  page: number;
  tag?: string;
};

async function getCookieHeader() {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
}

export async function fetchNotes(params: FetchParams): Promise<SearchResponse> {
  const { query, page, tag } = params;
  const response = await api.get<SearchResponse>('/notes', {
    params: { search: query, page, perPage: 12, tag },
    headers: await getCookieHeader(),
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`, {
    headers: await getCookieHeader(),
  });
  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await api.get<User>('/users/me', {
    headers: await getCookieHeader(),
  });
  return response.data;
}

export async function checkSession() {
  const response = await api.get('/auth/session', {
    headers: await getCookieHeader(),
  });
  return response;
}