const baseAPIUrl = 'http://localhost:8000/api'

export async function postData (path, data) {
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: JSON.stringify(data)
  }
  return await fetch(baseAPIUrl + path, options)
}

export async function getData (path) {
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
    },
  }
  return await fetch(baseAPIUrl + path, options)
}
