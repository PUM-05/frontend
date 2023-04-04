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

export async function getLoggedIn (path, sessionID) {
  const options = {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain',
      'Cookie': 'sessionid=' + JSON.stringify(sessionID)
    },
  }
  return await fetch(baseAPIUrl + path, options)
}