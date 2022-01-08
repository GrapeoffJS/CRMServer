import axios from 'axios'
import Url from '../../../../url/url'
import { swallGood } from '../../../../alert/alert'
import errorHandler from '../../../error-handler/error-handler'
import { add_all_pupils } from '../../../../actions'

const mapStateToProps = (state) => ({
  funnel: state.funnel,
})
const mapDispatchToProps = {
  add_all_pupils,
}

const onFinish = (
  values,
  setLoading_button,
  setVisible,
  add_all_pupils,
  form
) => {
  setLoading_button(true)
  axios({
    method: 'post',
    url: `${Url}/CRM/Pupils`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('tokenID')}`,
    },
    data: {
      ...values,
      dateOfBirth: values.dateOfBirth.toISOString(),
      parentPhones: [values.parentPhone],
    },
  })
    .then((res) => {
      setVisible(false)
      setLoading_button(false)
      add_all_pupils(res.data)
      form.resetFields()
      swallGood('Ученик создан')
    })
    .catch((error) => {
      errorHandler(
        () => onFinish(values),
        error,
        () => setLoading_button(false)
      )
    })
}

export { onFinish, mapStateToProps, mapDispatchToProps }
