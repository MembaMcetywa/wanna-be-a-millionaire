export interface Question {
  question: string
  options: string[]
  correctAnswer: string
  difficulty: Difficulty
}

export interface Reward {
  scoreIncrease: number
  winningsIncrease: number
}

export enum Difficulty {
  Easy = 'Easy',
  Meidum = 'Medium',
  Hard = 'Hard',
  VeryHard = 'Very Hard'
}
