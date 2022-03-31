import { parseISO, format } from 'date-fns';

export interface FormattedDateProps {
  rawDate: string;
}

export function FormattedDate({ rawDate }: FormattedDateProps) {
  const date = parseISO(rawDate);
  return <time dateTime={rawDate}>{format(date, 'd LLLL yyyy')}</time>;
}
