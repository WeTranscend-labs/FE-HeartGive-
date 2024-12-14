import { formatDistanceToNow as formatDistance, format } from 'date-fns';

export function formatDistanceToNow(date: Date): string {
  return formatDistance(new Date(date), { addSuffix: true });
}

export function formatDate(date: Date): string {
  return format(new Date(date), 'PPpp');
}
