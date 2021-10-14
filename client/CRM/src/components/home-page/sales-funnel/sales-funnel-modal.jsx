// imports from plugins
import React, {useState} from "react"
import {Button, DatePicker, Input, Modal} from "antd"
import moment from "moment"
import InputMask from "react-input-mask"
import {UserAddOutlined} from "@ant-design/icons"

// imports from files of project
import {
  FlexFunnelElement,
  StylesForInputMaskPhoneParentOrChild,
  StylesForUserAddOutlined
} from "./helpers/sales-funnel-styled"
import {axiosCreateNewStudent} from "./helpers/axios-requests"
import {swallErr, swallGood} from "../../../alert/alert"
import RestrictionMessage from "../../restriction-message/restriction-message"
import localStorage_change from "../../../#localStorage_change"

export const SalesFunnelModal = ({
                                   funnel,
                                   Url,
                                   pupils,
                                   status,
                                   loader,
                                   bigIcon = false,
                                   update = () => {
                                   },
                                   defaultValueOptionFunnel = ''
                                 }) => {

  // data
  const {setLoaded} = loader
  const {setPupilsList} = pupils
  const validateDiscordNickname = new RegExp(/\w+#[0-9]{4}/)
  //const validateChildPhoneAndParent = new RegExp(/^((\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)
  const dateFormat = "DD-MM-YYYY"
  // data

  // useState
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const [dateValue, setDateValue] = useState(moment("01-01-2021", dateFormat))
  const [inputName, setInputName] = useState("")
  const [inputSurname, setInputSurname] = useState("")
  const [inputMidname, setInputMidname] = useState("")
  const [selectGender, setSelectGender] = useState("")
  const [inputParentPhone, setInputParentPhone] = useState("")
  const [inputParentFullname, setInputParentFullname] = useState("")
  const [inputChildPhone, setInputChildPhone] = useState("")
  const [inputDiscordNickname, setInputDiscordNickname] = useState("")
  const [selectSalesFunnelStep, setSelectSalesFunnelStep] = useState(funnel[0]._id)
  // useState

  // Methods
  //// onChangeHandlers
  const onChangeHandlerSelectSalesFunnelId = (ev) => {
    setSelectSalesFunnelStep(prev => prev = ev.target.value)
  }
  const onChangeHandlerInputDiscrodNickname = (ev) => {
    setInputDiscordNickname(prev => prev = ev.target.value)
  }
  const onChangeHandlerInputChildPhone = (ev) => {
    setInputChildPhone(prev => prev = ev.target.value)
  }
  const onChangeHandlerInputParentFullname = (ev) => {
    setInputParentFullname(prev => prev = ev.target.value)
  }
  const onChangeHandlerInputParentPhone = (ev) => {
    setInputParentPhone(prev => prev = ev.target.value)
  }
  const onChangeHandlerSelectGender = (ev) => {
    setSelectGender(prev => prev = ev.target.value)
  }
  const onChangeHandlerInputMidname = (ev) => {
    setInputMidname(prev => prev = ev.target.value)
  }
  const onChangeHandlerInputSurname = (ev) => {
    setInputSurname(prev => prev = ev.target.value)
  }
  const onChangeHandlerInputName = (ev) => {
    setInputName(prev => prev = ev.target.value)
  }
  const onChangeHandlerDatePicker = (date) => {
    setDateValue(prev => prev = date)
  }
  //// onChangeHandlers

  const deletingDataFromForm = () => {
    setInputName(prev => prev = "")
    setInputSurname(prev => prev = "")
    setInputMidname(prev => prev = "")
    setDateValue(prev => prev = moment("01-01-2021", dateFormat))
    setSelectGender(prev => prev = "")
    setInputParentFullname(prev => prev = "")
    setInputDiscordNickname(prev => prev = "")
  }
  const handleCancel = () => {
    setVisible(false)
    deletingDataFromForm()
  }
  const showModal = () => {
    setVisible(true)
  }
  const onFocusHandleInputMask = (ev) => ev.target.value = ''
  const handleOk = async () => {
    try {
      setConfirmLoading(true)
      if (selectGender === "") {
        swallErr("Ошибка!", "Не указан пол")
        throw new Error("Не указан пол")
      }
      if (!(inputParentFullname.split(" ").filter(item => item !== "").length === 3)) {
        swallErr("Ошибка!", "ФИО Родителя введены неверно")
        throw new Error("ФИО Родителя введены неверно")
      }
      if (inputDiscordNickname !== "" && inputDiscordNickname.search(validateDiscordNickname) === -1) {
        swallErr("Ошибка!", "Ник в дискорде был введён не верно, проверьте наличие '#' и цифр после неё, а так же русских букв")
        throw new Error("Ник в дискорде был введён не верно, проверьте наличие '#' и цифр после неё, а так же русских букв")
      }
      if (!selectSalesFunnelStep) {
        swallErr("Ошибка!", "Этап в воронке не выбран")
        throw new Error("Этап в воронке не выбран")
      }
      const newStudent = {
        name: inputName,
        surname: inputSurname,
        midname: inputMidname,
        gender: selectGender,
        dateOfBirth: dateValue.toISOString(),
        phone: inputChildPhone || undefined,
        discord: inputDiscordNickname !== "" ? String(inputDiscordNickname.match(validateDiscordNickname).shift()) : undefined,
        parentPhone: inputParentPhone,
        parentFullname: inputParentFullname,
        salesFunnelStep: selectSalesFunnelStep
      }
      const student = await axiosCreateNewStudent(Url, newStudent)
      swallGood("Успешно!", "Пользователь создан!")
      update()
      // if (pupilsList.filter(stud => stud.salesFunnelStep === newStudent.salesFunnelStep).length >= pageSize) {
      await setPupilsList(prev => [...prev, {...student, closestTask: []}])
      setLoaded((prev => prev = true))
      setLoaded((prev => prev = false))
      // }
      setVisible(false)
      setConfirmLoading(false)
      deletingDataFromForm()
    } catch (err) {
      if (!status) console.log(err)
      setVisible(true)
      setConfirmLoading(false)
      if (err.response) {
        RestrictionMessage(err.response.status)
        let {status, data} = err.response
        if (status === 400) {
          swallErr("Не верно введены данные")
        }
        if (data.message === "TOKEN_EXPIRED") {
          localStorage_change(data.token)
        }
        if (status === 401) {
          localStorage.removeItem("tokenID")
          window.location.replace("/")
        }
        if (status === 500) {
          swallErr("Ошибка сервера")
        }
      }
    }
  }
  // Methods

  return (
    <>
      {bigIcon ?
        <div
          style={{
            position: 'absolute',
            right: 0
          }}
          className="collapse d-flex flex-row-reverse"
          id="navbarScroll">
          <div className="d-flex plus-box">
            <div
              className="nav-item plus"
              onClick={showModal}
            >
              <i
                className="bi bi-person-plus"
                style={{
                  fontSize: '38px',
                  color: '#F56767'
                }}
              ></i>
            </div>
          </div>
        </div> :
        <UserAddOutlined style={StylesForUserAddOutlined} onClick={showModal}/>
      }
      <Modal width={900} title="Создание ученика" visible={visible} onCancel={handleCancel} footer={[
        <Button key="back" onClick={handleCancel}>
          Отмена
        </Button>,
        <Button
          key="submit"
          onClick={handleOk}
          loading={confirmLoading}
          type="primary"
        >
          Добавить
        </Button>
      ]}>
        <form action="#" method="POST">
          <FlexFunnelElement>
            <p>Имя:</p>
            <Input onChange={onChangeHandlerInputName} value={inputName} required/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Фамилия:</p>
            <Input onChange={onChangeHandlerInputSurname} value={inputSurname} required/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Отчество:</p>
            <Input onChange={onChangeHandlerInputMidname} value={inputMidname} required/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Возраст:</p>
            <DatePicker className="form-control" placeholder="ГГГГ.ММ.ДД"
                        defaultValue={moment("01-01-2021", dateFormat)} format={dateFormat}
                        onChange={onChangeHandlerDatePicker}/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>ФИО Родителя:</p>
            <Input onChange={onChangeHandlerInputParentFullname} value={inputParentFullname} required
                   placeholder="Фамилия Имя Отчество"/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Ник в дискорде:</p>
            <Input onChange={onChangeHandlerInputDiscrodNickname} value={inputDiscordNickname}
                   placeholder="Необязательно"/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Номер телефона ребёнка:</p>
            <InputMask autoComplete="off" onChange={onChangeHandlerInputChildPhone}
                       onFocus={onFocusHandleInputMask}
                       style={StylesForInputMaskPhoneParentOrChild} type="tel" name="tel"
                       className="form-control"
                       mask="+9 (999) 999-99-99" placeholder="Необязательно"/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Номер телефона родителя:</p>
            <InputMask autoComplete="off" onChange={onChangeHandlerInputParentPhone}
                       onFocus={onFocusHandleInputMask}
                       style={StylesForInputMaskPhoneParentOrChild} type="tel" name="tel"
                       className="form-control"
                       mask="+9 (999) 999-99-99"/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Пол:</p>
            <select onChange={onChangeHandlerSelectGender} name="gender" value={selectGender}
                    className="form-control"
                    required>
              <option defaultValue></option>
              <option value="Мужской">Мужской</option>
              <option value="Женский">Женский</option>
            </select>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Воронка:</p>
            <select className="form-control" name="salesFunnelId" value={selectSalesFunnelStep}
                    onChange={onChangeHandlerSelectSalesFunnelId}>
              {defaultValueOptionFunnel}
              {funnel.map(step => {
                if (funnel[0]._id === step._id) {
                  return <option key={step._id} value={step._id} defaultValue>{step.name}</option>
                }
                return <option key={step._id} value={step._id}>{step.name}</option>
              })}
            </select>
          </FlexFunnelElement>
        </form>
      </Modal>
    </>
  )
}