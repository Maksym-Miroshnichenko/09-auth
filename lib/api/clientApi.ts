import { api } from './api';
import type { Note, NewNote } from '@/types/note';
import type { User } from '@/types/user';

export interface SearchResponse {
  notes: Note[];
  totalPages: number;
}

type FetchParams = {
  query: string;
  page: number;
  tag?: string;
};

export type AuthRequest = {
  email: string;
  password: string;
};

export async function fetchNotes(params: FetchParams): Promise<SearchResponse> {
  const { query, page, tag } = params;

  const response = await api.get<SearchResponse>('/notes', {
    params: {
      search: query,
      page,
      perPage: 12,
      tag,
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const response = await api.post<Note>('/notes', note);
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
}

export async function register(data: AuthRequest): Promise<User> {
  const response = await api.post<User>('/auth/register', data);
  return response.data;
}

export async function login(data: AuthRequest): Promise<User> {
  const response = await api.post<User>('/auth/login', data);
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function checkSession(): Promise<User | null> {
  const response = await api.get<User | ''>('/auth/session');
  return response.data || null;
}

export async function getMe(): Promise<User> {
  const response = await api.get<User>('/users/me');
  return response.data;
}

export async function updateMe(data: { username: string }): Promise<User> {
  const response = await api.patch<User>('/users/me', data);
  return response.data;
}