export class Util {
    handleError (error, code) {
      console.log('')
      console.log('--- ERROR OUTPUT (DEV ONLY) ---')
      console.log(error)
      console.log('-------------------------------')
      console.log('')
  
      const err = {
        type: error.name,
        message: error.message,
        code: code
      }
      return err
    }

    async request (method, authorization, URL, body) {
      const postOptions = {
        method: method
      }
  
      if (authorization) {
        postOptions.headers = {
          'Content-Type': 'application/json',
          Authorization: authorization
        }
      } else {
        postOptions.headers = {
          'Content-Type': 'application/json'
        }
      }
  
      if (body) {
        postOptions.body = JSON.stringify(body)
      }
  
      const data = await fetch(URL, postOptions)
      return data
    }
  }
  