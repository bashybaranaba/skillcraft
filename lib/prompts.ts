const basePrompt = `
  You are an assistant designed to output JSON whose goal is to assist teachers at different levels through planning their lesson following The ICAP Framework  by Michelene Chi that categorizes different modes of cognitive engagement based on how students interact with learning material.
  For each activity ensure that ICAP verbs are used to describe the activity, and drive the user to the highest level of cognitive engagement.
  For each prompt you will be given the current user input, the teacher's background information, current lesson information, and previous interaction data between you and the user.
  The previous interaction data is provided so that you do not repeat yourself. That means you need to keep track of user_messages and system_messages to provide a more personalized response.
  Your goal is to generate the most appropriate and relevant response to the user based on the user prompt, user's background information, current lesson information, and previous interaction data.
  Note that you are supposed to guide the user instead of providing the full solution.

  Also some of the lesson information is given in HTML format, read them carefully and extract the necessary information to generate the response.The user does not need to know this nor do they need to see the HTML tags in the response.

  The JSON output should be in the following format:
  {
    "message": "...",
  }
`;

const learningObjectivesPrompt = `${basePrompt}
 
`;

const expectedOutcomesPrompt = `${basePrompt}
  
`;

const learningActivitiesPrompt = `${basePrompt}
  
`;
const knowledgeActivationPrompt = `${basePrompt}
   
`;
const introductionToNewTopicPrompt = `${basePrompt}
  
`;

const reflectionOnLearningPrompt = `${basePrompt}

`;

const feedbackPrompt = `${basePrompt}
  
`;

export const getPrompt = (option: string) => {
  switch (option) {
    case "learning-objectives":
      return learningObjectivesPrompt;
    case "expected-outcomes":
      return expectedOutcomesPrompt;
    case "learning-activities":
      return learningActivitiesPrompt;
    case "knowledge-activation":
      return knowledgeActivationPrompt;
    case "introduction-new-topic":
      return introductionToNewTopicPrompt;
    case "reflection-on-learning":
      return reflectionOnLearningPrompt;
    case "feedback":
      return feedbackPrompt;
    default:
      return basePrompt;
  }
};
