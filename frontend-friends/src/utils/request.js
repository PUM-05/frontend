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
