import { Difficulty, type Reward } from './types'

const rewardsMap: Record<Difficulty, Reward> = {
  [Difficulty.Easy]: { scoreIncrease: 3, winningsIncrease: 50 },
  [Difficulty.Meidum]: { scoreIncrease: 5, winningsIncrease: 80 },
  [Difficulty.Hard]: { scoreIncrease: 7, winningsIncrease: 200 },
  [Difficulty.VeryHard]: { scoreIncrease: 10, winningsIncrease: 300 }
}

export const calculateRewards = (difficulty: Difficulty) => {
  return rewardsMap[difficulty]
}
