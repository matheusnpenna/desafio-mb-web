const DEFAULT_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
  }
}
export function useAPI() {
  const postRegister = (data) => {
    return new Promise((resolve, reject) => {
      return fetch('/register', {
        ...DEFAULT_OPTIONS,
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(r => r.json())
      .then(resolve)
      .catch(reject)
    });
  }

  return {
    postRegister
  }
}