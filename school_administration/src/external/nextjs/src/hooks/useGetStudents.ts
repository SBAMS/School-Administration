import { fetchWrapper } from '@/utils/fetchWrapper';
import { useQuery, UseQueryResult } from 'react-query';

export function getStudents<TStudent>(): Promise<TStudent[]> {
  return fetchWrapper<TStudent[], undefined>({
    url: `http://localhost:3000/api/students`,
  });
}

export function useGetStudents<TStudent>(): UseQueryResult<
  TStudent[] | undefined
> {
  return useQuery<TStudent[], Error>('students', getStudents, {
    onError: () => {
      console.error('Error getting Students');
    },
  });
}
