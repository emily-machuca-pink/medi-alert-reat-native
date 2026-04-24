import Constants from 'expo-constants';

type ExpoExtra = {
  apiUrl?: string;
};

function getExpoExtra(): ExpoExtra {
  const config = (Constants.expoConfig ?? (Constants as unknown as { manifest?: unknown }).manifest) as
    | { extra?: unknown }
    | undefined;

  return (config?.extra as ExpoExtra | undefined) ?? {};
}

const extra = getExpoExtra();

export const ENV = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? extra.apiUrl ?? 'http://localhost:3000',
} as const;

