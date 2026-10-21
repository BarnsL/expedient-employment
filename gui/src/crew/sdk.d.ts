declare module '@codexcrew/app-sdk' {
  export function useAppApi(): {
    get<T>(path: string): Promise<T>;
    post<T>(path: string, body: unknown): Promise<T>;
    delete<T>(path: string): Promise<T>;
  };
}
