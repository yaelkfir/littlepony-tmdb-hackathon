const initialData = [];

export default function testReducerGenres(data = initialData, action) {
  if (action.type === 'SET_GARNERS') {
    console.info(action.data);
    return action.data;
  }

  return data;
}
