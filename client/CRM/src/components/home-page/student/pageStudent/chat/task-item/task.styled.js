import styled from "@emotion/styled"

export const WrapperTasks = styled.div`
  position: ${props => props.portable ? "absolute" : "static"};
  transition: all .5s ease;
  z-index: 10;
  bottom: ${props => props.opened ? "0" : props.type === 2 ? "-290px" : "-268px"};
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
  font-family: Tahoma;
  .ant-picker {
    cursor: pointer;
    background: transparent;
    border: none;
    .ant-picker-suffix {
      color: ${props => props.portable ? "white" : "rgba(0, 0, 0, 0.75)"};
    }
  }
  .data {
      ${props => props.portable ? "" : `
      font-weight: 500;
      margin: 5px 0; 
      padding: 8px 10px;
      background: #E8EDF7;
      border-radius: 5px;
    `}
    padding: 5px 0;
    border: none;
    border-bottom: 1px solid ${props => props.portable ? "rgba(255, 255, 255, 0.9)" : "transparent"};
  }
  input, textarea {
    color: ${props => props.portable ? "white" : "rgba(0, 0, 0, 0.75)"};
    background: transparent;
    border: none;
  }
  input:focus, textarea:focus, .ant-picker:focus {
      outline: none;
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: ${props => props.portable ? "rgba(255, 255, 255, 0.7)" : ""};
  }
  textarea {
    resize: none;
    width: 100%;
  }
  .type__select {
    justify-content: space-between;
    > select:first-of-type {
      cursor: pointer;
      width: 100%;
      border: none;
      color: ${props => props.portable ? "white" : "rgba(0, 0, 0, 0.75)"};
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
  display: flex;
  align-items: center;
  .ant-select-selection-overflow-item {
    max-width: 100px;
  }
  > div {
    flex: 0 0 80%;
  }
`
export const CreateTagButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #E8EDF7;
  transition: all .2s ease;
  padding: 5px 10px;
  margin: 0 10px;
  border: none;
  cursor: pointer;
  > span {
    color: black;
  }
  &:hover {
    background: #BBC0CA;
  }
`
export const SelectResponsibleAndDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.portable ? "white" : "rgba(0, 0, 0, 0.75)"};
  * {
    margin: 0;
  }
  .background-gray {
    background: ${props => props.portable ? "transparent" : "#E8EDF7"};
  }
  > div {
    border-radius: 5px;
    margin: 0 0 5px 0;
    flex: 0 0 calc(100% / 3.1);
    > *:not(span) {
      border: none;
      border-radius: ${props => props.portable ? 0 : 5}px;
      margin: 2.5px;
      background: ${props => props.portable ? "transparent" : "#E8EDF7"};
      border-bottom: 1px solid ${props => props.portable ? "white" : "transparent"};
      width: 100%;
      height: 30px;
    }
    > .ant-picker {
      width: 100%;
      border-bottom: 1px solid ${props => props.portable ? "white" : "transparent"};
    }
  }
`
export const SubmitButton = styled.div`
  > button {
    border-radius: 4px;
    color: ${props => props.portable ? "#1890FF" : "white"};
    border: none;
    padding: 2.5px 15px;
    background: ${props => props.portable ? "white" : "#1890FF"};
    margin: 10px 0 5px 0;
    transition: all .2s ease;
    ${props => props.portable ? "" : `
      border-bottom: 3.5px solid #1D74FF;
    `}
    &:hover {
      background: ${props => props.portable ? "lightgray" : "#1083FF"};
    }
    &:active {
      background: ${props => props.portable ? "lightgray" : "#1D74FF"};
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
