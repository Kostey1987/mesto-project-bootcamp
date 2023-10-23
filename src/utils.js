let currentUserId = undefined;

export function getCurrentUserId() {
  return currentUserId;
}

export function setCurrentUserId(id) {
  currentUserId = id;
  return currentUserId;
}
