
// VARS
let localSecretKey: string | null = null;

export function set(secret: string) {
  localSecretKey = secret;
}

export function get() {
  return localSecretKey as string;
}
