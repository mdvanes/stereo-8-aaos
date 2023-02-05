import { createContext, FC, ReactNode, useCallback, useState } from "react";

export interface ReloadValues {
  disabled: boolean;
}

export const defaultReloadValues: ReloadValues = {
  disabled: false,
};

export const ReloadContext = createContext({
  disabled: defaultReloadValues.disabled,
  reload: () => {},
});

export const ReloadContextProvider: FC<{
  children?: ReactNode | undefined;
}> = ({ children }) => {
  const [disabled, setDisabled] = useState<ReloadValues["disabled"]>(
    defaultReloadValues.disabled
  );

  const reload = useCallback(() => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  }, []);

  return (
    <ReloadContext.Provider
      value={{
        disabled,
        reload,
      }}
    >
      {children}
    </ReloadContext.Provider>
  );
};
