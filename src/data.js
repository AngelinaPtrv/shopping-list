import uniqueId from 'lodash.uniqueid';

export const tablesData = [
  {
    navigation: {title: 'Car', url: 'car'},
    list: [
      {id: uniqueId('car-'), checked: false, name: "Очиститель", quantity: 1, units: "шт"},
      {id: uniqueId('car-'), checked: false, name: "Коврики", quantity: 2, units: "упак"},
      {id: uniqueId('car-'), checked: false, name: "Губки", quantity: 2, units: "шт"}
    ]
  },
  {
    navigation: {title: 'Home', url: 'home'},
    list: [
      {id: uniqueId('home-'), checked: false, name: "Полотенце", quantity: 1, units: "шт"},
      {id: uniqueId('home-'), checked: false, name: "Таблетки для посудомойки", quantity: 2, units: "упак"},
      {id: uniqueId('home-'), checked: false, name: "Порошок", quantity: 1, units: "шт"},
      {id: uniqueId('home-'), checked: false, name: "Ополаскиватель", quantity: 1, units: "шт"},
      {id: uniqueId('home-'), checked: false, name: "Гель для посуды", quantity: 1, units: "шт"}
    ]
  },
  {
    navigation: {title: 'Food', url: 'food'},
    list: [
      {id: uniqueId('food-'), checked: false, name: "Хлеб", quantity: 1, units: "шт"},
      {id: uniqueId('food-'), checked: false, name: "Помидоры", quantity: 2, units: "кг"},
      {id: uniqueId('food-'), checked: false, name: "Огурцы", quantity: 2, units: "кг"},
      {id: uniqueId('food-'), checked: false, name: "Пиво", quantity: 2, units: "бан"}
    ]
  }
];
