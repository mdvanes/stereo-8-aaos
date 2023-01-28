import { createContext, FC, ReactNode, useState } from "react";

export interface ProgressValues {
  progress: number;
}

export const defaultProgressValues: ProgressValues = {
  progress: 0,
};

export const ProgressContext = createContext({
  progress: defaultProgressValues.progress,
  setProgress: (_: ProgressValues["progress"]) => {},
});

export const ProgressContextProvider: FC<{
  children?: ReactNode | undefined;
}> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressValues["progress"]>(
    defaultProgressValues.progress
  );

  return (
    <ProgressContext.Provider
      value={{
        progress,
        setProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
