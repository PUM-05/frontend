const baseAPIUrl = 'http://localhost:8000/api'

export async function postData (path, data) {
  const options = {
    credentials: 'include',
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: JSON.stringify(data)
  }
  return await fetch(baseAPIUrl + path, options)
}

export async function getLoggedIn (path) {
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }
  const response = await fetch(baseAPIUrl + path, options)
  return response.status
}
