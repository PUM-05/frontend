const baseAPIUrl = 'http://localhost:8000/api'

/**
 * Sends a HTTP POST request to the server
 * @param {*} path specifies which url path the request should be sent to
 * @param {*} data is the data that should be sent in the body of the request
 * @returns the request response
 */
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

/**
 * Sends a HTTP GET request to the server
 * @param {*} path specifies which url path the request should be sent to
 * @returns the response status code
 */
export async function getLoggedIn (path) {
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }

  const response = await fetch(baseAPIUrl + path, options)
  return response.status
}

export async function getData (path) {
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }
  return await fetch(baseAPIUrl + path, options)
}
