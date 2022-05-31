import { fetchWrapper } from '@/utils/fetchWrapper';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface MutationVariables<TAddStudentStudy> {
  newStudentID: number | undefined;
  studyGroupIDs: number | TAddStudentStudy;
}

async function createStudentStudyGroup<TAddStudentStudy>({
  newStudentID,
  studyGroupIDs,
}: MutationVariables<TAddStudentStudy>): Promise<unknown> {
  return await fetchWrapper<unknown, TAddStudentStudy | any>({
    method: 'POST',
    url: `http://localhost:3000/api/student-study/${newStudentID}`,
    body: studyGroupIDs,
  });
}

export function useAddStudentStudyGroups<TAddStudentStudy>(): UseMutationResult<
  unknown,
  unknown,
  MutationVariables<TAddStudentStudy>,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, MutationVariables<TAddStudentStudy>>(
    ({ newStudentID, studyGroupIDs }) =>
      createStudentStudyGroup<TAddStudentStudy>({
        newStudentID,
        studyGroupIDs,
      }),
    {
      onSuccess: () => {
        alert('Success! The Student has been Added.');
      },
      onError: () => {
        alert('Error: Failed to Add the student.');
      },
      onSettled: (_data, _error) => {
        queryClient.invalidateQueries('getStudyGroups');
        queryClient.invalidateQueries('students');
      },
    }
  );
}
