import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  burgerBunSelector,
  burgerConstructorActions,
  burgerIngredientsSelector
} from '../../services/slices/burger/constructor-slice';
import {
  getUser,
  isUserAuthCheckedSelector,
  userSelector
} from '../../services/slices/user/user-auth-slice';
import {
  isOrderLoadingSelector,
  placeBurgerOrder,
  userOrderSelector
} from '../../services/slices/user/user-order-slice';
import { userOrderActions } from '../../services/slices/user/user-order-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bun = useSelector(burgerBunSelector);
  const ingredients = useSelector(burgerIngredientsSelector);
  const orderModalData = useSelector(userOrderSelector);
  const user = useSelector(userSelector);

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const orderRequest = useSelector(isOrderLoadingSelector);

  const onOrderClick = () => {
    if (!user) return navigate('/login');
    if (!constructorItems.bun || orderRequest) return;
    else {
      const ingredientsId = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );
      const bunId = constructorItems.bun._id;
      const orderData = [bunId, ...ingredientsId, bunId];
      dispatch(placeBurgerOrder(orderData));
      dispatch(getUser());
    }
  };
  const closeOrderModal = () => {
    dispatch(burgerConstructorActions.clearIngridients());
    dispatch(userOrderActions.clearUserOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
