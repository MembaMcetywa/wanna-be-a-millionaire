# wanna-be-a-millionaire

The $outh African American game show.

## Assumptions (How it works)
1. Users take part in a 12 question general knowledge quiz and WIN. They start with easy question and progress through to diffcult questions to score and win more. 
<br>
2. The more difficult the question the higher the reward. The rewards are mapped as key value pair like so (score : value) with the following structure:
<br>
3 (easy) :50
<br>
5 (medium) :80
<br>
7 (hard) :200
<br>
10 (very hard) :300
<br>
3. This makes the game dynamic and a bit more interesting. More importantly it gives users more incentive to try get to the end of the game.
<br>
4. Users have 30 seconds to answer each question. If the timer reaches zero it will trigger the end of that particular game.
<br>
5. Users can cash out at any time during the quiz.
<br>
6. Quiz can end in one of three ways, a timeout , a wrong answer, and completion.
<br>
7. The idea is a continuous prodding of the user to play again, by guaranteeing at least some win which can add up considerably the longer you stay in the game. Then keep the latest score visible on the start screen. Inspired by Google's Dino Game.


## Technologies And Why
1. Vite - very fast build tool because it uses eslint under the hood and works well with TypeScript and most Frontend frameworks. I personally like it for the speed and hot reloads.
2. Vue3 - explicit requirement for the project. 
3. Vue-router - Easier integration into a Vue project since it was built specifically for vue. Also a great learning opportunity which I took.
4. Axios - standard package used to interact with endpoints / servers.

## Setup
Clone the repo and run the following command to get it running locally
```npm run dev```
