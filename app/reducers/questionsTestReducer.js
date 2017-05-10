const initialData = 'MovieMorePopular';

export default function QuestionTest(data = initialData, action) {
  if (action.type === 'SET_QUESTION') {
    return action.data;
  }
  return data;
}

/*
RENDER IN COMPONENT WILL CHANGE BY this.props.questionTest
 itok connect
 */
