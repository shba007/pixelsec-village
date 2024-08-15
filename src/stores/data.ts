import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export type ageChoice = '18-25' | '26-35' | '36-44' | '45-54'
export type spendTimeChoice = 'Music' | 'Social Media' | 'Banking' | 'Shopping Cart' | 'Email' | 'Movie' | 'Gaming' | 'Health Tracker'
export type CharacterSkin = 'blue' | 'gray' | 'pink' | 'violate'

interface Choice {
  readTC: boolean | null
  age: ageChoice | null
  spendTime: spendTimeChoice[]
  annoyingPoints: string | null
  dataTradeOff: string | null
}

export const useDataStore = defineStore('data', () => {
  const choices = reactive<Choice>({
    readTC: null,
    age: null,
    spendTime: [],
    annoyingPoints: null,
    dataTradeOff: null,
  })

  function setReadTC(value: boolean) {
    return (choices.readTC = value)
  }

  return {
    setReadTC,
  }
})
