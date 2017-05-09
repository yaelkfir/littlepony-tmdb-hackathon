let initialData = localStorage.getItem('HighScore')? localStorage.getItem('HighScore') : 0;

export default function highscore(data = initialData, action) {
  if (action.type === 'SET_HIGH_SCORE') {
    return action.highestscore;
  }

  if (action.type === 'CURRENT_SCORE') {
    return action.currentscore;
  }
  if (action.type === 'RESET_SCORE') {
    return 0;
  }


  return data;
}
