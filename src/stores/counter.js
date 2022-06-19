import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count:0,
  }),
  actions: {
    increaseCount(){
      console.log('lets inc')
      this.count++
    },
    decreaseCount(){
      this.count--
    }
  },
  getters: {
    oddOrEven: (state) => {
      if(state.count % 2 === 0 )return 'even'
      return 'odd'
    }
  }

});
