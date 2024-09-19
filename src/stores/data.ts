import { ref, reactive, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { ofetch } from 'ofetch'
import { nanoid } from 'nanoid'

export type CharacterSkin = 'blue' | 'gray' | 'pink' | 'violate'

export type ageChoice = '18-25' | '26-35' | '36-44' | '45-54'
export type spendTimeChoice = 'banking' | 'email' | 'game' | 'health' | 'movie' | 'music' | 'shopping' | 'social'
export type dataExchangeChoice = 'shopping-info' | 'bank-card-details' | 'social-media-profile' | 'personal-preferences' | 'personal-details'
export type dataBreachActionChoice = 'do-nothing' | 'take-action-only-when-prompted' | 'alert-the-authority-change-login-details' | 'delete-the-app'
export type dataResponsibilityChoice = 'me-myself-i' | 'government' | 'companies' | 'not-sure'
export type annoyingPointChoice = 'begin-followed' | 'having-to-keep-giving-away-info' | 'cant-save-autofill-details-in-incognito-mode' | 'cant-store-all-my-digital-identities-in-one-place'

interface Choice {
  readTC: boolean | null
  age: ageChoice | null
  spendTime: spendTimeChoice[]
  dataExchange: dataExchangeChoice[] | null
  collectData: boolean | null
  dataBreachAction: dataBreachActionChoice | null
  dataResponsibility: dataResponsibilityChoice | null
  annoyingPoint: annoyingPointChoice | null
  dataVault: boolean | null
  dataRewardsTradeoff: boolean | null
  email: string | null
}

const scoreCard = {
  readTC: {
    true: 3,
    false: 0,
  },
  dataExchange: {
    'shopping-info': 3,
    'bank-card-details': 1,
    'social-media-profile': 1,
    'personal-preferences': 2,
    'personal-details': 2,
  },
  collectData: {
    true: 3,
    false: 1,
  },
  dataBreachAction: {
    'do-nothing': 2,
    'take-action-only-when-prompted': 3,
    'alert-the-authority-change-login-details': 5,
    'delete-the-app': 1,
  },
  dataResponsibility: {
    'me-myself-i': 5,
    government: 3,
    companies: 2,
    'not-sure': 1,
  },
  annoyingPoint: {
    'begin-followed': 2,
    'having-to-keep-giving-away-info': 5,
    'cant-save-autofill-details-in-incognito-mode': 1,
    'cant-store-all-my-digital-identities-in-one-place': 3,
  },
  dataVault: {
    true: 5,
    false: 1,
  },
  dataRewardsTradeoff: {
    true: 1,
    false: 5,
  },
}

const apiBaseURL = 'https://h13p701h52.execute-api.ap-south-1.amazonaws.com/dev/affinidi-dataville-log'
const apiKey = 'b0vQG5LaMa5AKAgvngkHeakXmyShdVGo8FxVUkdt'

export const useDataStore = defineStore('data', () => {
  const key = nanoid()
  const choices = reactive<Choice>({
    readTC: null,
    age: null,
    spendTime: [],
    dataExchange: null,
    collectData: null,
    dataBreachAction: null,
    dataResponsibility: null,
    annoyingPoint: null,
    dataVault: null,
    dataRewardsTradeoff: null,
    email: null,
  })

  watch(
    choices,
    async (value) => {
      try {
        await ofetch(apiBaseURL, {
          method: 'POST',
          headers: { 'x-api-key': apiKey },
          body: {
            key,
            data: value,
          },
        })
      } catch (error) {
        console.warn('API Request Failed')
      }
    },
    { deep: true }
  )

  const score = ref(0)

  const resultHouse = computed(() => {
    if (score.value < 9) return 1
    else if (score.value < 19) return 2
    else if (score.value < 29) return 3
    else return 4
  })

  function setReadTC(value: boolean) {
    choices.readTC = value
    score.value += scoreCard.readTC[String(value) as 'true' | 'false']
  }

  function setAge(value: ageChoice) {
    choices.age = value
  }

  function setSpendTime(value: spendTimeChoice[]) {
    choices.spendTime = value
  }

  function setDataExchange(value: dataExchangeChoice[]) {
    choices.dataExchange = value

    for (const v of value) {
      score.value += scoreCard.dataExchange[v]
    }
  }

  function setCollectData(value: boolean) {
    choices.collectData = value

    score.value += scoreCard.collectData[String(value) as 'true' | 'false']
  }

  function setDataBreachAction(value: dataBreachActionChoice) {
    choices.dataBreachAction = value

    score.value += scoreCard.dataBreachAction[value]
  }

  function setDataResponsibility(value: dataResponsibilityChoice) {
    choices.dataResponsibility = value

    score.value += scoreCard.dataResponsibility[value]
  }

  function setAnnoyingPoint(value: annoyingPointChoice) {
    choices.annoyingPoint = value

    score.value += scoreCard.annoyingPoint[value]
  }

  function setDataVault(value: boolean) {
    choices.dataVault = value

    score.value += scoreCard.dataVault[String(value) as 'true' | 'false']
  }

  function setDataRewardsTradeoff(value: boolean) {
    choices.dataRewardsTradeoff = value

    score.value += scoreCard.dataRewardsTradeoff[String(value) as 'true' | 'false']
  }

  function setEmail(value: string) {
    choices.email = value
  }

  return {
    resultHouse,
    score,
    setReadTC,
    setAge,
    setSpendTime,
    setDataExchange,
    setCollectData,
    setDataBreachAction,
    setDataResponsibility,
    setAnnoyingPoint,
    setDataVault,
    setDataRewardsTradeoff,
    setEmail,
  }
})
