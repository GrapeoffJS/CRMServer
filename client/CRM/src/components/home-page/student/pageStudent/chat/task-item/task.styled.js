import styled from "@emotion/styled"

export const WrapperTasks = styled.div`
  position: ${props => props.portable ? "absolute" : "static"};
  transition: all .5s ease;
  z-index: 10;
  bottom: ${props => props.opened ? "0": props.type === 2 ? "-600px" : "-580px"};
  width: 100%;
  border-radius: ${props => props.portable ? "10px 10px 0 0" : "0"};
  background: ${props => props.portable ? "#1890FF" : "white"};
  border: 1px solid ${props => props.portable ? "#1890FF" : "white"};
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
    border-bottom: 1px solid ${props => props.portable ? "rgba(255, 255, 255, 0.9)" : "rgba(211, 211, 211, 0.9)"};
  }
  input {
    color: ${props => props.portable ? "white" : "black"};
    background: transparent;
    border: none;
    &:focus {
      outline: none;
    }
  }
  input::-webkit-input-placeholder {
    color: ${props => props.portable ? "rgba(255, 255, 255, 0.7)" : "rgba(211, 211, 211, 0.8)"};
  }
  textarea {
    resize: none;
    width: 100%;
    color: ${props => props.portable ? "white" : "black"};
    background: transparent;
    border: none;
    &:focus {
      outline: none;
    }
  }
  textarea::-webkit-input-placeholder {
    color: ${props => props.portable ? "rgba(255, 255, 255, 0.7)" : "rgba(211, 211, 211, 0.8)"};
  }
  .type__select {
    color: ${props => props.portable ? "white" : "black"};
    justify-content: space-between;
    > select:first-of-type {
      cursor: pointer;
      width: 100%;
      border: none;
      color: ${props => props.portable ? "white" : "black"};
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
export const TagBlock = styled.div`
  margin: 5px 0 0 0;
  display: flex;
  justify-content: space-between;
  > div {
    flex: 0 0 calc(100% / 3);
    color: ${props => props.portable ? "white" : "black"};
    > div:last-of-type {
      color: black;
      border-bottom: 1px solid ${props => props.portable ? "#1890FF" : "lightgray"};
      background: ${props => props.portable ? "white" : "transparent"};
      height: 100px;
      max-height: 100px;
      overflow: hidden auto;
      > span {
        display: block;
        margin: 2px;
        cursor: pointer;
        transition: all .2s ease;
        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }
  
`
export const CreateTagBlock = styled.section`
  display: flex;
  flex-direction: column;
  > input {
    width: 100%;
    color: ${props => props.portable ? "white" : "black"};
    border-bottom: 1px solid ${props => props.portable ? "white" : "lightgray"};
    &::-webkit-input-placeholder {
      color: ${props => props.portable ? "rgba(255, 255, 255, 0.7)" : "rgba(211, 211, 211, 0.8)"};
    }
  }
`
export const SelectResponsible = styled.div`
  display: flex;
  flex-direction: column;
  color: ${props => props.portable ? "white" : "black"};
  .black {
    color: black;
  }
  input {
    border-bottom: 1px solid ${props => props.portable ? "white" : "lightgray"};
    margin: 0 0 5px 0;
  }
  p {
    margin: 0;
  }
  div:first-of-type {
    height: 85px;
  }
  div {
    border-bottom: 1px solid lightgray;
    overflow: hidden auto;
    padding: 0;
    margin: 0;
    background: white;
    > p {
      color: ${props => props.portable ? "white" : "#1890FF"};
      font-weight: 600;
      position: relative;
      cursor: pointer;
      background: ${props => props.portable ? "#1890FF" : "white"};
      margin: 2.5px;
      padding: 0 30px 0 5px;
      font-size: 13px;
      ${props => props.portable ? "border: 1px solid #1890FF" : "border-bottom: 1px solid lightgray"};
      border-radius: ${props => props.portable ? "4px" : "0"};
      transition: all .2s ease;
      &:hover {
        background: ${props => props.portable ? "transparent" : "lightgray"};
        color: #1890FF;
      }
    }
  }
  > div:last-of-type {
    margin: 5px 0 0 0;
    > p {
      border: none
    }
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
    border-radius: 4px;
    color: ${props => props.portable ? "#1890FF" : "white"};
    border: none;
    padding: 2.5px 15px;
    background: ${props => props.portable ? "white" : "#1890FF"};
    margin: 10px 0 5px 0;
    transition: all .2s ease;
    &:hover {
      background: ${props => props.portable ? "lightgray" : "#1F75FF"};
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
export const OpacityContainer = styled.div`
  display: flex;
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
