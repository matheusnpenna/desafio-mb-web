const DEFAULT_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
  }
}
const config = {
  baseURL: 'http://localhost:8989/api'
}
export function useAPI() {

  const postRegister = (data) => {
    return new Promise((resolve, reject) => {
      return fetch(`${config.baseURL}/register`, {
        ...DEFAULT_OPTIONS,
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(async r => {
        const data = await r.json();
        return { status: r.status, ...data };
      })
      .then(resolve)
      .catch(reject)
    });
  }

  return {
    postRegister
  }
}