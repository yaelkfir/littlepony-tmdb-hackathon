const initialData = [];

export default function testReducer(data = initialData, action) {
  if (action.type === 'SET_MOVIES') {
    console.info('action.data',action.data);
    return action.data;
  }

  return data;
}
