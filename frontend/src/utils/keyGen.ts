let id = 0;
export function getNewId() {
  const newId = String(id);
  id++
  return newId
}