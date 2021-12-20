import styled from "@emotion/styled";

const CreateTrialLessonStyle = styled.div`
  margin-bottom: 16px;

  .select {
    margin-bottom: 16px;
  }

  .week-and-pupils {
    display: flex;
  }

  .selection-students {
    margin-left: 8px;
    flex: 1;
  }

  table {
    margin-right: 8px;
  }

  .none-table {
    opacity: 0.2;
  }

  .chosen_teacher {
    margin-top: 16px;

    td {
      background: #002140;
      color: #fff;
    }

    .date {
      .anticon-double-left {
        position: relative;
        top: -1px;
        color: #1890ff;
        font-size: 19px;
        cursor: pointer;
        margin-right: 8px;
      }
      .anticon-double-right {
        position: relative;
        top: -1px;
        color: #1890ff;
        font-size: 19px;
        cursor: pointer;
        margin-left: 8px;
      }
    }
  }
`

const Table = styled.table`
  user-select: none;
  width: 70%;

  tr {
    border-bottom: 1px solid #002140;
  }

  .week {
    td {
      text-align: left;
      background: #001529;
      color: #fff;
      border-right: 1px solid #002140;
    }

    .white {
      background: #f0f2f5;
    }
  }

  .time {
    background: #001529;
    color: #fff;
  }

  td {
    padding: 10px;
    width: 12.5%;
    height: 50px;
    text-align: right;
  }

  .td {
    padding: 0;
    border-right: 1px solid #002140;

    .ant-list-item {
      padding: 0 7px;
      display: flex;
    }

    .item-span {
      width: 6px;
      height: 6px;
      background: #52c41a;
      border-radius: 50%;
      margin-right: 2px;
    }
  }
`

export {
    CreateTrialLessonStyle,
    Table
}