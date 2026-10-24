import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api/serverApi';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  const description = note.content.slice(0, 100);

  return {
    title: `${note.title}`,
    description,
    openGraph: {
      title: `${note.title}`,
      description,
      url: `https://08-zustand-one-omega-65.vercel.app/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

export default function NoteDetails() {
  return <NoteDetailsClient />;
}
