import { fetchWrapper } from '@/utils/fetchWrapper';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

interface MutationVariables<TStudentValues> {
  studentID: number | TStudentValues;
  name: string | TStudentValues;
  sex: string | TStudentValues;
  email: string | TStudentValues;
}

async function sendStudentUpdate<TStudentValues>({
  name,
  sex,
  email,
  studentID,
}: MutationVariables<TStudentValues>): Promise<unknown> {
  return await fetchWrapper<unknown, TStudentValues | any>({
    method: 'PATCH',
    url: `http://localhost:3000/api/students/${studentID}`,
    body: { name, sex, email, studentID },
  });
}

export function useUpdateStudent<TStudentValues>(): UseMutationResult<
  unknown,
  unknown,
  MutationVariables<TStudentValues>,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, MutationVariables<TStudentValues>>(
    ({ name, sex, email, studentID }) =>
      sendStudentUpdate<TStudentValues>({ name, sex, email, studentID }),
    {
      onSuccess: () => {
        alert('Success! Student has been updated.');
      },
      onError: () => {
        alert('Error: Failed to update the student.');
      },
      onSettled: (_data, _error, variables) => {
        queryClient.invalidateQueries('roles');
        queryClient.invalidateQueries(['selectedRole', variables.studentID]);
      },
    }
  );
}
