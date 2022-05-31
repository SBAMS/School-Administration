import { fetchWrapper } from '@/utils/fetchWrapper';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

interface MutationVariables<TStudentValues> {
  studentID: number | TStudentValues;
}

async function deleteStudents<TStudentValues>(
  studentID: MutationVariables<TStudentValues>
): Promise<unknown> {
  return await fetchWrapper<unknown, TStudentValues | any>({
    method: 'DELETE',
    url: `http://localhost:3000/api/students/${studentID}`,
  });
}

export function useDeleteeStudent<TStudentValues>(): UseMutationResult<
  unknown,
  unknown,
  MutationVariables<TStudentValues>,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, MutationVariables<TStudentValues>>(
    (studentID) => deleteStudents<TStudentValues>(studentID),
    {
      onSuccess: () => {
        alert('Success! Student has been Deleted.');
      },
      onError: () => {
        alert('Error: Failed to delete the student.');
      },
      onSettled: (_data, _error, variables) => {
        queryClient.invalidateQueries('students');
        queryClient.invalidateQueries(['students', variables.studentID]);
      },
    }
  );
}
