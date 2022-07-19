const KEY = "taskapp";

export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function saveState(state: Object) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    console.log(e);
  }
}

export async function deleteState() {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    console.log(e);
  }
}
