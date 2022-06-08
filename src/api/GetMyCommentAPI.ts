import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function GetMyCommentAPI({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) {
  API.GetCSRFToken();
  const authToken = AuthService.getToken();
  const url = API.GetAPIHost('/api/comment/my');
  const body = {
    offset,
    limit,
  };
  const res = await API.PostAPI(url, body, {
    Authorization: `Bearer ${authToken}`,
  });

  return res;
}
