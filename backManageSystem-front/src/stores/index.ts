import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      baseRouterUrl: '',
      siderType: false
    }
  },
  getters: {},
  actions: {
    changeSiderType(): void {
      this.siderType = !this.siderType
    }
  }
})
