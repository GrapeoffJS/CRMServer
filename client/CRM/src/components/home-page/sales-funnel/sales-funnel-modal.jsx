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
import hooksHandler from "../../../helpers/hooksHandler"

export const SalesFunnelModal = React.memo(({
                                              funnel,
                                              Url,
                                              setPupilsList,
                                              status,
                                              setLoaded,
                                              bigIcon = false,
                                              update = () => {
                                              },
                                              defaultValueOptionFunnel = ''
                                            }) => {

  // data
  const validateDiscordNickname = new RegExp(/\w+#[0-9]{4}/)
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
  const [inputParentPhones, setInputParentPhones] = useState("")
  const [inputParentFullname, setInputParentFullname] = useState("")
  const [inputChildPhones, setInputChildPhones] = useState("")
  const [inputDiscordNickname, setInputDiscordNickname] = useState("")
  const [selectSalesFunnelStep, setSelectSalesFunnelStep] = useState(funnel[0]._id)

  const [mask, setMask] = useState(["+9 (999) 999-99-99"])
  const [mask2, setMask2] = useState(["+9 (999) 999-99-99"])
  // useState

  // Methods
  const onFocusHandleInput = (ev) => ev.target.value = ''
  const onKeyDownInputHandler = (setMask) => {
    return (event) => {
      if (!(event.key === "Enter")) return

      setMask(prev => prev = [...prev, ", ", prev[0]])
    }
  }
  const deletingDataFromForm = () => {
    setInputName(prev => prev = "")
    setInputSurname(prev => prev = "")
    setInputMidname(prev => prev = "")
    setDateValue(prev => prev = moment("01-01-2021", dateFormat))
    setSelectGender(prev => prev = "")
    setInputParentFullname(prev => prev = "")
    setInputDiscordNickname(prev => prev = "")
    setMask(prev => prev = ["+9 (999) 999-99-99"])
    setMask2(prev => prev = ["+9 (999) 999-99-99"])
  }
  const handleCancel = () => {
    setVisible(false)
    deletingDataFromForm()
  }
  const showModal = () => {
    setVisible(true)
  }
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
        phones: inputChildPhones.split(",") || undefined,
        discord: inputDiscordNickname !== "" ? String(inputDiscordNickname.match(validateDiscordNickname).shift()) : undefined,
        parentPhones: inputParentPhones.split(","),
        parentFullname: inputParentFullname,
        salesFunnelStep: selectSalesFunnelStep
      }
      const student = await axiosCreateNewStudent(Url, newStudent)
      swallGood("Успешно!", "Пользователь создан!")
      update()
      await setPupilsList(prev => [...prev, {...student, closestTask: []}])
      setLoaded((prev => prev = true))
      setLoaded((prev => prev = false))
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
            <Input onChange={hooksHandler(setInputName, "event.target.value")} value={inputName} required/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Фамилия:</p>
            <Input onChange={hooksHandler(setInputSurname, "event.target.value")} value={inputSurname} required/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Отчество:</p>
            <Input onChange={hooksHandler(setInputMidname, "event.target.value")} value={inputMidname} required/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Возраст:</p>
            <DatePicker className="form-control" placeholder="ГГГГ.ММ.ДД"
                        defaultValue={moment("01-01-2021", dateFormat)} format={dateFormat}
                        onChange={hooksHandler(setDateValue, "event")}/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>ФИО Родителя:</p>
            <Input onChange={hooksHandler(setInputParentFullname, "event.target.value")} value={inputParentFullname}
                   required
                   placeholder="Фамилия Имя Отчество"/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Ник в дискорде:</p>
            <Input onChange={hooksHandler(setInputDiscordNickname, "event.target.value")} value={inputDiscordNickname}
                   placeholder="Необязательно"/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Номер телефона ребёнка:</p>
            <InputMask autoComplete="off" onChange={hooksHandler(setInputChildPhones, "event.target.value")}
                       onKeyDown={onKeyDownInputHandler(setMask)}
                       onFocus={onFocusHandleInput}
                       style={StylesForInputMaskPhoneParentOrChild} type="tel" name="tel"
                       className="form-control"
                       mask={mask.join("")} placeholder="Необязательное поле"/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Номер телефона родителя:</p>
            <InputMask autoComplete="off" onChange={hooksHandler(setInputParentPhones, "event.target.value")}
                       onKeyDown={onKeyDownInputHandler(setMask2)}
                       onFocus={onFocusHandleInput}
                       style={StylesForInputMaskPhoneParentOrChild} type="tel" name="tel"
                       className="form-control" mask={mask2.join("")}/>
          </FlexFunnelElement>
          <FlexFunnelElement>
            <p>Пол:</p>
            <select onChange={hooksHandler(setSelectGender, "event.target.value")} name="gender" value={selectGender}
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
                    onChange={hooksHandler(setSelectSalesFunnelStep, "event.target.value")}>
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
})