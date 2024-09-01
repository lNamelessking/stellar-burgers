import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSelector } from '../../services/slices/user/user-auth-slice';

export const AppHeader: FC = () => {
  const userNameHandler = useSelector(userSelector)?.name || '';
  return <AppHeaderUI userName={userNameHandler} />;
};
