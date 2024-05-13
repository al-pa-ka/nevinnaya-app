interface IUser {
    authentificate(login: string, password: string): Promise<string>;
    getPermissions(): string[];
    setToken(token: string): void;
    isAutentificated(): boolean;
}

export type { IUser };
