import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  feedOrdersSelector,
  getFeed,
  isFeedLoadingSelector
} from '../../services/slices/user/feed-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(feedOrdersSelector);
  const feedLoadingHandler = useSelector(isFeedLoadingSelector);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (feedLoadingHandler) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeed())} />;
};
