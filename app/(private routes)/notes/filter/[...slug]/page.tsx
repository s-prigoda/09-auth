import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] || 'all';
  const siteUrl = 'https://notehub.vercel.app'; // Твій майбутній лінк на Vercel

  return {
    title: `Notes filtered by: ${filter}`,
    description: `Browse notes filtered by "${filter}" tag. Find relevant notes quickly.`,
    openGraph: {
      title: `Notes filtered by: ${filter}`,
      description: `Browse notes filtered by "${filter}" tag. Find relevant notes quickly.`,
      url: `${siteUrl}/notes/filter/${filter}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub preview for ${filter} notes`,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;
  const filter = slug?.[0] || 'all';
  const tag = filter === 'all' ? undefined : filter;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', filter],
    queryFn: () => fetchNotes(tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
