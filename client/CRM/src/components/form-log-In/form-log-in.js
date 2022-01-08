import React, { useState } from 'react'
import './form-log-in.css'
import Url from '../../url/url.js'

import { swallErr, Toast } from '../../alert/alert'
import RestrictionMessage from '../restriction-message/restriction-message.js'

import styled from '@emotion/styled'

const axios = require('axios') // AJAX

const LogIn = styled.div({
  height: '500px',
  button: {
    fontWeight: 'bold',
    fontSize: '21px',
    width: '150px',
    borderRadius: '19px',
    transition: '0.3s',
    borderColor: '#007bff',
    color: '#000',
    '&:hover': {
      transition: '0.3s',
      backgroundColor: '#f7d99f',
    },
  },
  label: {
    fontSize: '24px',
    fontWeight: '400',
  },
  input: {
    color: '#000',
    fontSize: '20px',
  },
  'input[type=text]': {
    background: 'none',
  },
  'input[type=password]': {
    background: 'none',
  },
  i: {
    cursor: 'pointer',
  },
})

const FormlogIn = ({ setUser }) => {
  const [eye, setEye] = useState({
    icons: 'bi-eye-fill',
    type: 'password',
  }) // bi-eye-slash-fill
  const [valuePassword, setValuePassword] = useState(''),
    [valueLogin, setValueLogin] = useState('')

  const [disabled, setDisabled] = useState('submit')

  // Style state
  const [inputBorder_L, set_I_Border_L] = useState(''),
    [inputBorder_P, set_I_Border_P] = useState('')

  let valueChangeL = valueLogin,
    valueChangeP = valuePassword

  const showPassword = () => {
    setValuePassword(valueChangeP)
    setValueLogin(valueChangeL)

    if (eye.icons === 'bi-eye-fill') {
      setEye({
        icons: 'bi-eye-slash-fill',
        type: 'text',
      })
    } else {
      setEye({
        icons: 'bi-eye-fill',
        type: 'password',
      })
    }
  }

  // Alert
  const swallGood = () => {
    Toast.fire({
      icon: 'success',
      title: 'Вы успешно вошли в систему',
    })
  }
  // \alert

  let opacityBtn = '1'

  if (disabled === 'button') {
    opacityBtn = '0.3'
  }

  const InputBorder_L_Style = styled.input`
    border: ${inputBorder_L};
  `
  const InputBorder_P_Style = styled.input`
    border: ${inputBorder_P};
  `
  const Button = styled.button`
    opacity: ${opacityBtn};
  `

  // =============

  let regLogin = new RegExp(/^[\w\d\W]{1,40}$/),
    regPassword = new RegExp(/^.{1,40}$/)

  const FormSubmit = async (e) => {
    setValuePassword(valueChangeP)
    setValueLogin(valueChangeL)

    e.preventDefault()

    if (!regLogin.test(valueChangeL)) {
      set_I_Border_L('2px solid red')
    } else {
      set_I_Border_L('')
    }
    if (!regPassword.test(valueChangeP)) {
      set_I_Border_P('2px solid red')
    } else {
      set_I_Border_P('')
    }

    if (regLogin.test(valueChangeL) && regPassword.test(valueChangeP)) {
      setDisabled('button')

      axios({
        method: 'post',
        url: `${Url}/auth`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        data: {
          login: valueChangeL,
          password: valueChangeP,
        },
      })
        .then((res) => {
          localStorage.setItem('tokenID', res.data.token)
          // jwt.decode(localStorage.getItem('tokenID')

          setValuePassword('')
          setValueLogin('')
          setDisabled('submit')
          swallGood()
          setUser(valueChangeL)
        })
        .catch((error) => {
          if (error.response) {
            RestrictionMessage(error.response.status)
            let { status } = error.response
            if (status === 400) {
              swallErr('Ой..', 'Пользователя не существует')
              set_I_Border_L('2px solid red')
              set_I_Border_P('2px solid red')
              setDisabled('submit')
            } else {
              setDisabled('submit')
            }
          }
        })
    }
  }

  return (
    <LogIn className="LogIn container d-flex align-items-center justify-content-center">
      <form onSubmit={FormSubmit} key={'form1'} className="col-md-8 col-12">
        <fieldset>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label"
            >{`Логин`}</label>
            <InputBorder_L_Style
              required
              onChange={(e) => {
                valueChangeL = e.target.value
              }}
              defaultValue={valueLogin}
              autoComplete="current-password"
              type="name"
              className="form-control"
              name="login"
              id="exampleInputEmail1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Пароль
            </label>
            <InputBorder_P_Style
              required
              onChange={(e) => {
                valueChangeP = e.target.value
              }}
              defaultValue={valuePassword}
              autoComplete="current-password"
              type={`${eye.type}`}
              className="form-control"
              name="password"
              id="exampleInputPassword1"
            />
            <div className="password-control">
              <div className="d-flex justify-content-end">
                <i
                  onClick={showPassword}
                  className={`bi ${eye.icons}`}
                  style={{ fontSize: '28px', color: '#F5896C' }}
                ></i>
              </div>
            </div>
          </div>
          <Button type={disabled} className="btn">
            Войти
          </Button>
        </fieldset>
      </form>
    </LogIn>
  )
}

export default FormlogIn
