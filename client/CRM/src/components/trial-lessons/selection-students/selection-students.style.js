import styled from "@emotion/styled";

const SelectionStudentsStyle = styled.div`
  background: #fff;

  .find-students-for-trial-lesson {
    background: #fff;

    .Button {
      width: 100%;
      color: #000;
      text-transform: none;
    }

    .MuiListItem-root {
      border-bottom: 1px solid #f0f0f0;
    }
  }

  .list-students-for-trial-lesson {
    margin-top: 16px;
    background: #fff;
    border-top: 1px solid rgb(82, 196, 26);

    .item {
      padding: 8px 16px;
      display: flex;
      width: 100%;
      justify-content: space-between;

      .delete {
        width: 14px;
      }

      .title {
        padding: 0 10px;
        word-wrap: break-word;
        width: 100%
      }

      & > div {
        margin: auto 0;
      }
    }
  }
`

export {
    SelectionStudentsStyle
}