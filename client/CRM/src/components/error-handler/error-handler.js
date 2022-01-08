import { RestrictionMessage } from '../../alert/alert'
import localStorage_change from './../../#localStorage_change'
import { swallErr } from '../../alert/alert'

const errorHandler = (onFunction, error, ...additionalActions) => {
  if (error.response) {
    let notification = true
    additionalActions.forEach((fnc) => {
      if (typeof fnc !== 'boolean') {
        fnc()
      } else {
        notification = fnc
      }
    })
    RestrictionMessage(error.response.status)
    let { status, data } = error.response

    if (data.message === 'Bad Request' && notification) {
      swallErr('Не возможно удалить воронку в которой есть ученик')
    } else if (status == 404 && notification) {
      swallErr('Сервер не найден')
    } else if (status == 401) {
      if (data.message == 'TOKEN_EXPIRED') {
        localStorage_change(data.token)
        onFunction()
      } else {
        localStorage.removeItem('tokenID')
        window.location.replace('/')
      }
    } else if (status == 500 && notification) {
      swallErr('Ошибка сервера')
    } else if (status == 400 && notification) {
      swallErr('Не верно введены данные')
    }
  }
}

export default errorHandler
