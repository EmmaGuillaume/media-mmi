import { PrimitiveAtom, atom } from "jotai";

export const userAtom: PrimitiveAtom<any> = atom(null);
export const accessTokenAtom: PrimitiveAtom<string> = atom("");