const request = async (url, method = 'GET', body = null, headers = {}) => {
  debugger;
  try {
    if (body) body = JSON.stringify(body);

    const response = await fetch(url, { method, body, headers });
    const data = await response.json();


    if (data.resultCode) throw new Error(data.message);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const registration = (data) => {
  request('/api/auth/registration', 'POST', data, {
    'Content-Type': 'Application/json'
  });
}