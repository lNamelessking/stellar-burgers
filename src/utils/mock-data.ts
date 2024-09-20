export const ingredientsToAddMockData = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  }
];

export const ingredientsToRemoveMockData = [
  {
    id: '1',
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    id: '2',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  }
];

export const ingredientsFetchedMockData = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  }
];

export const feedMockData = {
  success: true,
  orders: [
    {
      _id: '66eb55e0119d45001b507b1b',
      ingredients: ['643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa0943'],
      status: 'done',
      name: 'Space бургер',
      createdAt: '2024-09-18T22:36:16.708Z',
      updatedAt: '2024-09-18T22:36:17.191Z',
      number: 53344
    }
  ],
  total: 1,
  totalToday: 1
};

export const registerUserMockData = {
  email: 'v1lkazhyk@yandex.ru',
  name: 'Egor',
  password: 'example'
};

export const loginUserMockData = {
  email: 'v1lkazhyk@yandex.ru',
  password: 'example'
};

export const userMockData = {
  email: 'v1lkazhyk@yandex.ru',
  name: 'Egor'
};

export const orderMockData = {
  success: true,
  orders: [
    {
      _id: '66ed634b119d45001b507ec8',
      status: 'done',
      createdAt: '2024-09-20T11:58:03.859Z',
      updatedAt: '2024-09-20T11:58:04.410Z',
      number: 53438,
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      name: 'Флюоресцентный люминесцентный бургер'
    }
  ],
};

export const newOrderMockData = {
  success: true,
  order:
    {
      _id: '66ed634b119d45001b507ec8',
      status: 'done',
      createdAt: '2024-09-20T11:58:03.859Z',
      updatedAt: '2024-09-20T11:58:04.410Z',
      number: 53438,
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      name: 'Флюоресцентный люминесцентный бургер'
    }
  ,
  name: 'Флюоресцентный люминесцентный бургер'
};