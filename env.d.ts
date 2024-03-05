declare namespace NodeJS {
  export interface ProcessEnv {
    HOST: string;
    PORT: string;
    INTEGRATION_API_URL: string;
    NODE_ENV?: 'production' | 'development' | 'staging';
  }
}
