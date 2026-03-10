import Session from "./session";
import type { SessionType } from '@/store/user'
import { refreshToken } from '@/libs/cognitoClient';

class TokenCenter {
  private refreshing = false;
  private tasks: Function[] = [];

  // 刷新 token 请求
  private refreshTokenRequest = async (session: SessionType) => {
    this.refreshing = true;
    try {
      const result = await refreshToken(session);
      Session.setSession(result);
      this.taskCompleted(result);
    } catch (err) {
      console.log(err);
      Session.clearSession();
      this.taskCompleted();
    }
    this.refreshing = false;
  }

  // 刷新 token 完成
  private taskCompleted = (session?: SessionType) => {
    this.tasks.forEach(fn => fn(session?.accessToken));
    this.tasks = [];
  }

  // 设置 token
  public setToken = (session: SessionType) => {
    return Session.setSession(session);
  }

  //获取 token
  public getToken = () => new Promise<string | undefined>(async (resovle) => {
    this.tasks.push(resovle);

    if (this.refreshing) {
      return;
    }

    const session = await Session.getSession();

    if (session?.expired) {
      this.refreshTokenRequest(session);
    } else {
      this.taskCompleted(session);
    }
  });

  public logout = () => {
    Session.clearSession();
  }
}

export default new TokenCenter();