
import { createContext } from "react";

interface AppContextType {
  message: boolean;
  setMessage: React.Dispatch<React.SetStateAction<boolean>>;
  isMessageProcessing: CryptoKey[];
  setIsMessageProcessing: React.Dispatch<React.SetStateAction<CryptoKey[]>>;
  PlaintextString: string;
  setPlaintextString: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType>({
  message: false,
  setMessage: () => {},
  isMessageProcessing: [],
  setIsMessageProcessing: () => {},
  PlaintextString: "",
  setPlaintextString: () => {},
});

export default AppContext;
