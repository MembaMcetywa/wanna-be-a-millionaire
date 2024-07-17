# Wanna-Be-A-Millionaire

The $outh African American game site.

## How It Works

Users take part in a 12-question general knowledge quiz to win "cash", with questions ranging from easy to difficult. Each question must be answered within 30 seconds.

### Game Dynamics and Rules

1. Questions increase in difficulty from easy to very hard.
2. Rewards scale with question difficulty, structured as follows:
   - Easy: 3 points, $50 reward
   - Medium: 5 points, $80 reward
   - Hard: 7 points, $200 reward
   - Very Hard: 10 points, $300 reward
3. Participants have 30 seconds to answer each question. Failure to answer within this time will end the game.
4. Users can choose to cash out at any point during the quiz.
5. The game can end due to a timeout, a wrong answer, or successful completion of all questions.
6. The idea is for a continuous prodding of the user to play again by guaranteeing a win. Everyone likes to win especially money. And then the most recent score is displayed on the start screen, inspired by Google's Dino Game.

## Technologies Used

- **Vite**: Its a very fast build tool because it esbuild under the hood and works well with TypeScript and most frontend frameworks.
- **Vue 3**: This was an explicit requirement for the project.
- **Vue Router**: Provides seamless routing options designed specifically for Vue apps. Also presented a great learning opportunity which I took.
- **Pinia**: Simple state management tool with great support for Vue.  Also presented a great learning opportunity which I took.
- **Axios**: Standard package for performing HTTP requests to backend services.

## Setup

To run this project locally, clone the repository and execute the following command:

```bash
npm run dev
