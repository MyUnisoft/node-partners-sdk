let accessType: AccessLabel;

type AccessLabel = "firm";

export function set(access: AccessLabel) {
  accessType = access;

  return;
}

export function get() {
  return accessType as AccessLabel;
}

export function isFirmAccess() {
  return accessType === "firm";
}
