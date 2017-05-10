const initialData = 'lets play';

export default function gamesMode(data = initialData, action) {
  if (action.type === 'GAME_MODE') {
    return action.data;
  }

  return data;
}
