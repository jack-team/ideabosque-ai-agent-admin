import useStore, { type SessionType } from '@/store/user';

class Session {
  static clearSession = () => {
    useStore.getState().logout();
  }

  static setSession = (session: SessionType) => {
    const s = useStore.getState();
    return s.updateToken(session);
  }

  static getSession = async () => {
    const s = useStore.getState().token;
    if (!s) {
      return;
    }
    const expired = Date.now() > s.expiresAt;
    return {
      ...s,
      expired
    }
  }
}

export default Session;

