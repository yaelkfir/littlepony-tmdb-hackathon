const initialData = 'lets play';

export default function gamesmode(data = initialData, action) {
  if (action.type === 'GAME_MODE') {
    return action.data;
  }

  return data;
}
