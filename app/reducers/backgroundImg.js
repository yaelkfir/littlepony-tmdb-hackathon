const initialData = ['271110','118340','135397'];

export default function backImg(data = initialData, action) {

  if (action.type === 'SET_BACKGROUND_IMG') {

    return action.data;

  }




  return data;
}
