import { PrimitiveAtom, atom } from "jotai";

const atomWithLocalStorage = (key: string, initialValue: any) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return initialValue;
  };
  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );
  return derivedAtom;
};

export const userAtom: PrimitiveAtom<any> = atomWithLocalStorage(
  "userAtom",
  null
);
export const accessTokenAtom: PrimitiveAtom<string> = atomWithLocalStorage(
  "accessTokenAtom",
  ""
);
