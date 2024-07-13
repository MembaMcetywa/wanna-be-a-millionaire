export interface Question {
  question: string
  options: string[]
  correctAnswer: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard'
}
