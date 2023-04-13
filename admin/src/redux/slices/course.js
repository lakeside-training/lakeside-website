/* eslint-disable eqeqeq */
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
              moduleHeading: action.payload.moduleHeading,
              moduleDiscription: action.payload.moduleDiscription,
              resourse: action.payload.resourse,
              lab_ids: action.payload.lab_ids,
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
    removeResourses: (state, action) => {
      const newSate = current(state.modules);
      const index = newSate.map((item) => {
        if (item.id === action.payload.moduleId) {
          let newResourse = item.resourse.filter(
            (question) => question.id !== action.payload.resourseId
          );
          return { ...item, resourse: newResourse };
        }
        return item;
      });

      state.modules = index;
    },
    insertResourseValue: (state, action) => {
      const newSate = current(state.modules);
      const index = newSate.map((item) => {
        if (item.id === action.payload.moduleId) {
          const updatedResourse = item.resourse.map((resourse) => {
            if (resourse.id === action.payload.resourseId) {
              return { ...resourse, value: action.payload.value };
            } else {
              return resourse;
            }
          });
          return { ...item, resourse: updatedResourse };
        } else {
          return item;
        }
      });
      state.modules = index;
    },
    addLabs: (state, action) => {
      const newSate = current(state.modules);
      const index = newSate.map((item) => {
        if (item.id === action.payload.moduleId) {
          const updatedLabs = item.lab_ids.map((lab_ids) => {
            if (lab_ids.id === action.payload.labsId) {
              return { ...lab_ids, value: action.payload.value };
            } else {
              return lab_ids;
            }
          });
          return { ...item, lab_ids: updatedLabs };
        } else {
          return item;
        }
      });
      state.modules = index;
    },

    removeLabs: (state, action) => {
      const newSate = current(state.modules);
      const index = newSate.map((item) => {
        if (item.id === action.payload.moduleId) {
          let newLabs = item.lab_ids.filter(
            (labs) => labs.id !== action.payload.labsId
          );
          return { ...item, lab_ids: newLabs };
        }
        return item;
      });

      state.modules = index;
    },

    
    // insertAnswerValues: (state, action) => {
    //   const newSate = current(state.modules);
    //   const index = newSate.map((item) => {
    //     if (item.id === action.payload.moduleId) {
    //       return {
    //         ...item,
    //         resourse: item.resourse.map((resourse) => {
    //           if (resourse.id === action.payload.resourseId) {
    //             return {
    //               ...resourse,

    //             };
    //           } else {
    //             return resourse;
    //           }
    //         }),
    //       };
    //     } else {
    //       return item;
    //     }
    //   });
    //   state.modules = index;
    // },

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
    setEditValue: (state, action) => {
      console.log(action.payload);
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
    clears : (state, action) => {
      state.modules = []
      
  },
  },
});


export const {
  setModuleValue,
  removeModule,
  questionEmpty,
  removeResourses,
  insertValues,
  insertAnswerValues,
  correctAnswers,
  addModuleHeading,
  addModuleDescription,
  setEditValue,
  addModuleResourse,
  removeQuestion,
  insertResourseValue,
  addLabTrackIds,
  addLabs,
  removeLabs,
  clears
} = arraySlice.actions;
export default arraySlice.reducer;
