import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
  name: 'productsManager',
  initialState: {
    products: [
      {
        id: 1,
        title: 'Yamaha Erg-121',
        purchasePrice: 200,
        sellingPrice: 250,
        quantity: 20
      },
      {
        id: 2,
        title: 'Yamaha Pacifica 012',
        purchasePrice: 300,
        sellingPrice: 350,
        quantity: 5
      },
      {
        id: 3,
        title: 'Yamaha Thr-10',
        purchasePrice: 300,
        sellingPrice: 400,
        quantity: 10
      },
    ],
    history: [],
    balance: 10000
  },
  reducers: {
    deleteElement: (state, getInfo) => {
      let historyObj = {
        type: "Удаление товара",
        desc: `Удаленный товар:  ${state.products.find(item => item.id === getInfo.payload.id).title}`,
        date: `${new Date().toLocaleString()}`
      }
      state.history = [...state.history, historyObj]

      state.products = state.products.filter(n => n.id !== getInfo.payload.id);
    },

    changeElement: (state, action) => {
      let { id, qtn } = action.payload.object;
      let index = state.products.findIndex(item => item.id === id);
      let historyObj = {
        type: "Продажа товара",
        desc: `Проданный товар:  ${state.products[index].title}; Изменение баланса: +${state.products[index].sellingPrice * qtn}$; Кол-во проданного товара: ${qtn}`,
        date: `${new Date().toLocaleString()}`
      }

      state.history = [...state.history, historyObj]
      state.products[index].quantity -= qtn;
      state.balance += state.products[index].sellingPrice * qtn
    },

    addElement: (state, action) => {
      let { id, title, purchasePrice, sellingPrice, quantity } = action.payload.object;
      let index = state.products.findIndex(item => item.title === title);
      let historyObj = {
        type: "Добавление товара",
        desc: `Добавленный товар:  ${title}; Изменение баланса: -${purchasePrice * quantity}$`,
        date: `${new Date().toLocaleString()}`
      }

      if (state.products.length === 0) {
        id = 0;
      } else {
        id = state.products[state.products.length - 1].id + 1;
      }

      if (index !== -1) {
        state.products[index] = {
          id: state.products[index].id,
          title,
          purchasePrice,
          sellingPrice,
          quantity: state.products[index].quantity += quantity
        }
        historyObj.type = "Обновленние данных о товаре"
        historyObj.desc = `Обновленный товар:  ${title}; Изменение баланса: -${purchasePrice * quantity}$; Кол-во добавленного товара: ${quantity}`
      } else {
        state.products = [...state.products, { id, title, purchasePrice, sellingPrice, quantity }]
      }

      state.balance -= purchasePrice * quantity
      state.history = [...state.history, historyObj]
    },
  }
})


export const { deleteElement, changeElement, addElement } = productsSlice.actions
export default productsSlice.reducer