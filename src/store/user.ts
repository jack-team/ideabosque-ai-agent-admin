
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { signIn } from '@/libs/cognitoClient';

type SignInResultType = Awaited<ReturnType<typeof signIn>>;

type UserType = {
  email: string;
  userName: string;
}

type TokenResult = Omit<SignInResultType, 'userName'>;

type UserModelTypes = {
  user: UserType | null;
  token: TokenResult | null;
  collapsed: boolean;
}

type UpdateParams = TokenResult & UserType;

type UserModelMethods = {
  toggleCollapsed: () => void;
  updateUser: (params: UpdateParams) => void;
  logout: () => void;
}

export const useUserModel = create(
  persist<UserModelTypes & UserModelMethods>(
    (set, get) => ({
      user: null,
      token: null,
      collapsed: false,
      updateUser: (params) => {
        const { userName, email, ...token } = params;
        set({ token, user: { email, userName } });
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