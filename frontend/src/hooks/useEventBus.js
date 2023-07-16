export const useEventBus = () => {
  const on = (event, callback) => {
    document.addEventListener(event, e => callback(e.data));
  };

  const dispatch = (event, data) => {
    document.dispatchEvent(new CustomEvent(event, { data }));
  };

  const remove = (event, callback) => {
    document.removeEventListener(event, callback);
  };

  return {
    on,
    dispatch,
    remove
  }
};

export default useEventBus;