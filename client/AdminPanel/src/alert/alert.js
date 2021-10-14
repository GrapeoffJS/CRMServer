import React, {useState, useEffect} from 'react';

import Swal from 'sweetalert2';

export const swallErr = (title, text) => {
    Swal.fire({
        icon: "error",
        title: title,
        text: text,
    });
};

export const swallGood = (title, text) => {
    Swal.fire({
        icon: "success",
        title: title,
        text: text,
    });
};

export const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

export const loading = (title, text = '') => {
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
    }
})
}

export const Swalclose = () => {
    Swal.close();
}

export const RestrictionMessage = status => {
    if (status == 403) {
        Toast.fire({
            icon: 'error',
            title: 'У вас недостаточно прав для этого действия'
        });
    }
}