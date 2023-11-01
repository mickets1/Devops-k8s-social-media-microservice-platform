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
  }
  