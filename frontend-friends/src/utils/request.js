const baseAPIUrl = 'http://localhost:8000/api'

export async function postData (path, data) {
  const options = {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: JSON.stringify(data)
  }
  return await fetch(baseAPIUrl + path, options)
}

export async function getLoggedIn (path) {
  const options = {
    methods: ['GET', 'OPTIONS'],
    mode: 'cors',
    headers: {
      'Content-Type': 'text/plain'
    }
  }
  const data = await fetch(baseAPIUrl + path, options); 
  return data;
}