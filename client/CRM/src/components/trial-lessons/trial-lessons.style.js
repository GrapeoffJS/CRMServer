import styled from "@emotion/styled";

const TrialLessonsStyle = styled.div`
  .trial-lesson-schedule-skeleton {
    display: block;

    div {
      display: block;
      width: 100%;

      span {
        width: 100%;
        margin-bottom: 8px;
        height: 56px;
      }
    }
  }

  .trial-lesson-schedule {
    td {
      padding: 10px 10px;
    }

    .ant-checkbox-inner {
      height: 20px;
      width: 20px;
    }
  }

  .trial-lesson-schedule-comments {
    display: flex;

    button {
      margin: auto 0;
      margin-left: 8px;
    }
  }
`

export {
    TrialLessonsStyle
}