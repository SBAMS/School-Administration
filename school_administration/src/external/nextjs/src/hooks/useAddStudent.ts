import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { fetchWrapper } from '@/utils/fetchWrapper';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface MutationVariables<TAddStudent> {
  studentID: number | TAddStudent;
  name: string | TAddStudent;
  sex: string | TAddStudent;
  email: string | TAddStudent;
  placeOfBirth: string | TAddStudent;
  dateOfBirth: string | TAddStudent;
}

async function createStudent<TAddStudent>({
  name,
  sex,
  email,
  placeOfBirth,
  dateOfBirth,
}: MutationVariables<TAddStudent>): Promise<unknown> {
  return await fetchWrapper<unknown, TAddStudent | any>({
    method: 'POST',
    url: `http://localhost:3000/api/students/`,
    body: { name, sex, email, placeOfBirth, dateOfBirth },
  });
}

export function useAddStudent<TAddStudent>(): UseMutationResult<
  unknown,
  unknown,
  MutationVariables<TAddStudent>,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, MutationVariables<TAddStudent>>(
    ({ studentID, name, sex, email, placeOfBirth, dateOfBirth }) =>
      createStudent<TAddStudent>({
        studentID,
        name,
        sex,
        email,
        placeOfBirth,
        dateOfBirth,
      }),
    {
      onSuccess: () => {
        alert('Success! The Student has been created.');
        queryClient.invalidateQueries('students');
      },
      onError: () => {
        alert('Error: Failed to create the student.');
      },
    }
  );
}
