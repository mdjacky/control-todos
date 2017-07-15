const cleanLocalStorage = function () {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('userId')
  localStorage.removeItem('userName')
}

export default {
  checkAuth () {
    // Check info in localStorage
    let accessToken = localStorage.getItem('accessToken')
    let userId = localStorage.getItem('userId')
    let userName = localStorage.getItem('userName')
    // Token check is frontend only. Token is valid for only 30 mins
    if (userId && userName && accessToken && accessToken > Date.now() - 1800000) {
      return true
    } else {
      cleanLocalStorage()
      return false
    }
  },
  login (context, username) {
    return new Promise((resolve, reject) => {
      context.$http.get('https://jsonplaceholder.typicode.com/users').then(response => {
        let userList = response.body
        for (let user of userList) {
          if (username === user.username) {
            localStorage.setItem('accessToken', Date.now())
            localStorage.setItem('userId', user.id)
            localStorage.setItem('userName', user.name)
            context.$router.replace('/dashboard')
            resolve()
          }
        }
        reject()
      }, response => {
        console.log('error', response)
        reject()
      })
    })
  },
  logout (context) {
    cleanLocalStorage()
    context.$router.replace('/')
  }
}
