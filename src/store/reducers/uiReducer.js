const initState = {
  isNotificationOpen: false,
  notificationMessage: "",
  notificationColor: "success",
  tagClicked: "All",
  isModalOpen: false,
};

const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case "OPEN_NOTIFICATION":
      return {
        ...state,
        isNotificationOpen: true,
        notificationMessage: action.message,
        notificationColor: action.color,
      };
    case "CLOSE_NOTIFICATION":
      if (action.reason === "clickaway") {
        return { ...state, isNotificationOpen: true };
      }
      return { ...state, isNotificationOpen: false };
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true };
    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false };
    // case "TAG_CLICKED":
    // if (action.tag === "clickaway") {
    //   return { ...state, isNotificationOpen: true };
    // }
    // return { ...state, tagClicked: action.tag };
    default:
      return state;
  }
};
export default uiReducer;
