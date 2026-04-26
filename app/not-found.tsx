import css from './home.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Сторінку не знайдено | NoteHub',
  description:
    'На жаль, запитану сторінку не знайдено. Можливо, вона була видалена або її адреса змінилася.',
  openGraph: {
    title: '404 - Сторінку не знайдено | NoteHub',
    description:
      'На жаль, запитану сторінку не знайдено. Спробуйте повернутися на головну.',
    url: 'https://notehub.vercel.app/404',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Сторінку не знайдено',
      },
    ],
    type: 'website',
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Сторінку не знайдено</h1>
      <p className={css.description}>
        На жаль, сторінка, яку ви шукаєте, не існує.
      </p>
    </div>
  );
}
