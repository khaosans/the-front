import { Dispatch, SetStateAction } from 'react';

export type UseStateHook<T> = [T, Dispatch<SetStateAction<T>>];