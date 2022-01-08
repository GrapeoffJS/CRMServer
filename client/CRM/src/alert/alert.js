import React from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwalErr = withReactContent(Swal)

export const swallErr = (title, text) => {
  MySwalErr.fire({
    icon: 'error',
    title: title,
    text: text,
  })
}

const MySwaGood = withReactContent(Swal)

export const swallGood = (title = '', text = '') => {
  MySwaGood.fire({
    icon: 'success',
    title: title,
    text: text,
  })
}

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

export const loading = (title = 'Загрузка...', text = '') => {
  let timerInterval
  Swal.fire({
    title: title,
    html: text,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
        const content = Swal.getHtmlContainer()
        if (content) {
          const b = content.querySelector('b')
          if (b) {
            b.textContent = Swal.getTimerLeft()
          }
        }
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    },
  })
}

export const RestrictionMessage = (status) => {
  if (status == 403) {
    Toast.fire({
      icon: 'error',
      title: 'У вас недостаточно прав для этого действия',
    })
  }
}

export const Swalclose = () => {
  Swal.close()
}
