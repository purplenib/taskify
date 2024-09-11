import instance from './instance';

async function postImageUpload(formData: FormData) {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const res = await instance.post('/users/me/image', formData, {
    headers,
  });
  return res.data.profileImageUrl;
}

export default postImageUpload;
