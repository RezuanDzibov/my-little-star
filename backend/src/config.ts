interface ENV {
  POSTGRES_USER: string | undefined;
  POSTGRES_PASSWORD: string | undefined;
  POSTGRES_DATABASE: string | undefined;
  POSTGRES_DB: string | undefined;
  POSTGRES_PORT: number | undefined;
  POSTGRES_HOST: string | undefined;
  PROJECT_NAME: string | undefined;
  PROJECT_DESCRIPTION: string | undefined;
  PROJECT_VERSION: string | undefined;
  BACKEND_API_PORT: number | undefined;
}

interface Config {
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;
  POSTGRES_DB: string;
  POSTGRES_PORT: number;
  POSTGRES_HOST: string;
  PROJECT_NAME: string;
  PROJECT_DESCRIPTION: string;
  PROJECT_VERSION: string;
  BACKEND_API_PORT: number;
}

const getConfig = (): ENV => {
  return {
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_PORT: process.env.POSTGRES_PORT
      ? Number(process.env.POSTGRES_PORT)
      : undefined,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    PROJECT_NAME: process.env.PROJECT_NAME,
    PROJECT_DESCRIPTION: process.env.PROJECT_DESCRIPTION,
    PROJECT_VERSION: process.env.PROJECT_VERSION,
    BACKEND_API_PORT: process.env.BACKEND_API_PORT
      ? Number(process.env.BACKEND_API_PORT)
      : undefined,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

export const globalConfig = getConfig();

const sanitizedConfig = getSanitzedConfig(globalConfig);

export default sanitizedConfig;
