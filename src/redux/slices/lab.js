import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  modules: [],
};

const arraySlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModuleValue(state, action) {
      const isExisit =
        state.modules.findIndex((item) => item.id == action.payload.id) !== -1;

      if (isExisit) {
        state.modules = state.modules.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              moduleDiscription: action.payload.moduleDiscription,
              moduleHeading: action.payload.moduleHeading,
              questions: action.payload.questions,
            };
          }
          return item;
        });
      } else {
        state.modules.push(action.payload);
      }
    },
    removeModule: (state, action) => {
      const newSate = current(state.modules);
      const index = newSate.filter((i) => i.id !== action.payload.id);
      if (index.length >= 0) state.modules = index;
    },
    questionEmpty: (state, action) => {
      state.modules = [];
    },
    removeQuestion: (state, action) => {
      const newSate = current(state.modules);
      const index = newSate.map((item) => {
        if (item.id === action.payload.moduleId) {
          let newQuestions = item.questions.filter(
            (question) => question.id !== action.payload.questionId
          );
          return { ...item, questions: newQuestions };
        }
        return item;
      });

      state.modules = index;
    },
    insertValues: (state, action) => {
      const newSate = current(state.modules);
      const index = newSate.map((item) => {
        if (item.id === action.payload.moduleId) {
          const updatedQuestions = item.questions.map((question) => {
            if (question.id === action.payload.questionId) {
              return { ...question, question: action.payload.value };
            } else {
              return question;
            }
          });
          return { ...item, questions: updatedQuestions };
        } else {
          return item;
        }
      });
      state.modules = index;
    },
    insertAnswerValues: (state, action) => {
      const newSate = current(state.modules);
      const index = newSate.map((item) => {
        if (item.id === action.payload.moduleId) {
          return {
            ...item,
            questions: item.questions.map((question) => {
              if (question.id === action.payload.questionId) {
                return {
                  ...question,
                  choice: question.choice.map((answer) => {
                    if (answer.id === action.payload.answerId) {
                      return { ...answer, value: action.payload.value };
                    } else {
                      return answer;
                    }
                  }),
                };
              } else {
                return question;
              }
            }),
          };
        } else {
          return item;
        }
      });
      state.modules = index;
    },
    correctAnswers: (state, action) => {
      const newSate = current(state.modules);
      const index = newSate.map((item) => {
        if (item.id === action.payload.moduleId) {
          return {
            ...item,
            questions: item.questions.map((question) => {
              if (question.id === action.payload.questionId) {
                let quz = question.choice.map((item) => {
                  return {
                    ...item,
                    correct: false,
                  };
                });
                return {
                  ...question,
                  choice: quz.map((answer) => {
                    if (answer.id === action.payload.answerId) {
                      return { ...answer, correct: action.payload.value };
                    } else {
                      return answer;
                    }
                  }),
                };
              } else {
                return question;
              }
            }),
          };
        } else {
          return item;
        }
      });
      state.modules = index;
    },
    addModuleHeading: (state, action) => {
      const newSate = current(state.modules);
      const index = newSate.map((item) => {
        if (item.id === action.payload.moduleId) {
          return {
            ...item,
            moduleHeading: action.payload.value,
          };
        } else {
          return item;
        }
      });
      state.modules = index;
    },
    addModuleDescription: (state, action) => {
      const newSate = current(state.modules);
      const index = newSate.map((item) => {
        if (item.id === action.payload.moduleId) {
          return {
            ...item,
            moduleDiscription: action.payload.value,
          };
        } else {
          return item;
        }
      });
      state.modules = index;
    },
    setEditValue(state, action) {
      state.modules = action.payload;
    },
    addModuleResourse: (state, action) => {
      const newSate = current(state.modules);
      const index = newSate.map((item) => {
        if (item.id === action.payload.moduleId) {
          return {
            ...item,
            resourse: action.payload.resourse,
          };
        } else {
          return item;
        }
      });
      state.modules = index;
    },
    setEmpty: (state, action) => {
      state.modules = [];
    },
  },
});

export const {
  setModuleValue,
  removeModule,
  questionEmpty,
  removeQuestion,
  insertValues,
  insertAnswerValues,
  correctAnswers,
  addModuleHeading,
  addModuleDescription,
  setEditValue,
  addModuleResourse,
  setEmpty,
} = arraySlice.actions;
export default arraySlice.reducer;
