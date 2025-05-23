'use server';

import { auth } from '@/auth';
import { redirect } from '@/navigation';
import postService from '@/services/postService';
import ErrorType from '@/types/error';
import LocationFullType from '@/types/location';
import { formatDate } from 'date-fns';
import { toast } from 'sonner';

export type ToastTypes =
  | 'normal'
  | 'action'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'loading'
  | 'default';

async function createPost(
  prevState: {
    type: ToastTypes;
    message: string;
  },
  formData: FormData
) {
  'use server';
  const session = await auth();

  formData.get('applicationDeadline') &&
    formData.set(
      'applicationDeadline',
      formatDate(
        new Date(formData.get('applicationDeadline') as string),
        'dd/MM/yyyy'
      )
    );

  const locationJsons = formData.getAll('locations');
  formData.delete('locations');
  locationJsons
    .map((json) => JSON.parse(json as string) as LocationFullType)
    .forEach((location, i) => {
      formData.append(`locations[${i}].provinceName`, location.provinceName);
      formData.append(
        `locations[${i}].specificAddress`,
        location.specificAddress
      );
    });
  
  try {
    formData.append('currency', 'VND');

    await postService.createPost(formData, session?.accessToken!);

    return { type: 'success' as ToastTypes, message: 'Post created successfully.'};
  } catch (err) {
    return { type: 'error' as ToastTypes, message: (err as ErrorType).message };
  }
}

export default createPost;
