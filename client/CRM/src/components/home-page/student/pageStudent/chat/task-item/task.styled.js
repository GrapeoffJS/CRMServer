import styled from "@emotion/styled"

export const WrapperTasks = styled.div`
  position: ${props => props.portable ? "absolute" : "static"};
  transition: all .5s ease;
  z-index: 10;
  bottom: ${props => props.opened ? "0": props.type === 2 ? "-475px" : "-455px"};
  width: 100%;
  border-radius: ${props => props.portable ? "10px 10px 0 0" : "0"};
  background: #1890FF;
  border: 1px solid #1890FF;
  padding: 0 10px;
  
  > .buttonUp {
    position: relative;
    top: -13px;
    display: flex;
    align-items: center;
    justify-content: center;
    > button {
      display: flex;
      align-items: center;
      border-radius: 4px;
      border: 1px solid #1890FF;
      background: #1890FF;
      color: white;
      transition: all .2s ease;
      width: min-content;
      &:hover {
        background: white;
        color: #1890FF;
      }
      .anticon-double-left {
        margin: 0 5px 0 2.5px;
        transform: rotate(${props => props.opened ? -90 : 90}deg);
      }
    }
  }
`

export const CreateTask = styled.div`
  display: flex;
  overflow: hidden auto;
  flex-direction: column;
  .ant-picker {
    cursor: pointer;
    width: 100%;
    background: transparent;
    border: none;
    .ant-picker-suffix {
      color: white;
    }
    &:focus {
      outline: none;
    }
  }
  .data {
    padding: 5px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  }
  input {
    color: white;
    background: transparent;
    border: none;
    &:focus {
      outline: none;
    }
  }
  input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  textarea {
    resize: none;
    width: 100%;
    color: white;
    background: transparent;
    border: none;
    &:focus {
      outline: none;
    }
  }
  textarea::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  .type__select {
    color: white;
    justify-content: space-between;
    > select:first-of-type {
      cursor: pointer;
      width: 100%;
      border: none;
      color: white;
      background: transparent;
      > option {
        color: black;
      }
      &:focus {
        outline: none;
      }
    }
  }
`
export const SelectResponsible = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  .black {
    color: black;
  }
  input {
    border-bottom: 1px solid white;
    margin: 0 0 5px 0;
  }
  p {
    margin: 0;
  }
  div:first-of-type {
    height: 85px;
  }
  div {
    overflow: hidden auto;
    padding: 0;
    margin: 0;
    background: white;
    > p {
      position: relative;
      cursor: pointer;
      background: #1890FF;
      margin: 2.5px;
      padding: 0 30px 0 5px;
      font-size: 13px;
      border: 1px solid #1890FF;
      border-radius: 4px;
      transition: all .2s ease;
      &:hover {
        background: transparent;
        color: #1890FF;
      }
    }
  }
  > div:last-of-type {
    margin: 5px 0 0 0;
  }
`
export const AccountTypeSpan = styled.span`
  position: absolute;
  right: 5px;
  top: 0;
  margin: 0;
  padding: 0;
  color: #FFC700;
  font-family: "MontBold";
`
export const SubmitButton = styled.div`
  display: flex;
  justify-content: center;
  > button {
    color: #1890FF;
    border: none;
    padding: 2.5px 15px;
    background: white;
    margin: 10px 0 5px 0;
    transition: all .2s ease;
    &:hover {
      background: lightgray;
    }
  }
`
export const OpacityParagraph = styled.p`
  opacity: 0.8;
  width: 95%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
export const DeleteButton = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  top: 0;
  right: 0;
  > span {
    color: gray;
    transition: all .2s ease;
    &:hover {
      color: lightgray;
    }
  }
`
export const WrapperTaskComponent = styled.div`
  padding: 0 45px 0 0;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  > div > p:first-of-type {
    font-weight: bold;
  }
  > .done {
    text-decoration: ${props => props.done ? "line-through" : "none"};
  }
  p {
    margin: 0;
  }
`
export const CheckboxContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 5px;
`
