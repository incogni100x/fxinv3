import { useEffect } from "react";

const useUnsavedChangesWarning = (
  message: string = "Changes you made may not be saved."
) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    const handlePopState = (event: PopStateEvent) => {
      console.log(event);

      const confirmLeave = window.confirm(message);
      if (confirmLeave) {
        sessionStorage.clear();
      } else {
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [message]);
};

export default useUnsavedChangesWarning;
