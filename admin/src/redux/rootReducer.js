// ** Reducers Imports
import auth from "./slices/auth"
import layout from "./slices/layout"
import lab from "./slices/lab";
import course from './slices/course'

const rootReducer = {
  auth,
  layout,
  lab,
  course
}

export default rootReducer
