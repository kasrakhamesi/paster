import { createContext } from "react";

interface OpenseaContextType {
  project: any;
  setProject: (project: any) => void;
}

const OpenseaContext = createContext<OpenseaContextType>({
  project: null,
  setProject: () => {},
});
