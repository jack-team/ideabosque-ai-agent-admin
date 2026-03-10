
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { signIn } from '@/libs/cognitoClient';

export type SessionType = Awaited<ReturnType<typeof signIn>>;

type UserType = {
  email: string;
}

type UserModelTypes = {
  user: UserType | null;
  token: SessionType | null;
  collapsed: boolean;
}

type UpdateParams = SessionType & UserType;

type UserModelMethods = {
  logout: () => void;
  toggleCollapsed: () => void;
  updateToken: (token: SessionType) => void;
  updateUser: (params: UpdateParams) => void;
}

export const useUserModel = create(
  persist<UserModelTypes & UserModelMethods>(
    (set, get) => ({
      user: null,
      token: null,
      collapsed: false,
      updateUser: (params) => {
        const { email, ...token } = params;
        set({ token, user: { email } });
      },
      updateToken: (token) => {
        set({ token });
      },
      toggleCollapsed: () => {
        set({ collapsed: !get().collapsed });
      },
      logout: () => {
        set({
          user: null,
          token: null,
          collapsed: false
        });
      }
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useUserModel;