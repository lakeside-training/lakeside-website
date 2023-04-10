// ** Reducers Imports
import auth from "./slices/auth";
import layout from "./slices/layout";
import steps from "./slices/steps";
import notification from "./slices/notification";
import amount from './slices/amount'

const rootReducer = {
  auth,
  layout,
  steps,
  notification,
  amount
};

export default rootReducer;
