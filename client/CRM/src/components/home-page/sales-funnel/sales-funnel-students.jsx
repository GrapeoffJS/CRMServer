// imports from plugins
import React, {useState} from "react"
import {Draggable} from "react-beautiful-dnd"
import {NavLink} from "react-router-dom"
import {Tag, Button, Dropdown} from "antd"
import moment from "moment"

// imports from files of project
import {
  DropdownClosestTask,
  FunnelStepStudent,
  HoverTask,
  StatusesBlock,
  VisibilitySpan
} from "./helpers/sales-funnel-styled"
import {Loader} from "./helpers/loader"
import {tooltipCheckerOfTrioString} from "./helpers/tooltip-functions"
import {ClosestTask} from "./ClosestTask"

export const SalesFunnelStudents = ({Url, card, pupils, pageSize}) => {

  // data
  const {pupilsList} = pupils
  // data

  // useState
  const [loaded] = useState(false)
  // useState

  // methods
  const lengthCalculate = (statuses) => {
    if (Array.isArray(statuses)) return statuses.length
    return 0
  }
  // methods

  return (
    <>
      {loaded ? <Loader
        precentage={true}/> : pupilsList.filter(stud => stud.salesFunnelStep === card._id).map((stud, index) => {
        if (card._id === stud.salesFunnelStep) return (
          <Draggable key={stud._id} draggableId={`${stud._id}`} index={index}>
            {provided => (
              <FunnelStepStudent background={card.background} {...provided.draggableProps}
                                 {...provided.dragHandleProps} ref={provided.innerRef}>
                <div className="funnelStepStudent__first--info">
                  <div>
                    <NavLink to={`/student/${stud._id}`}>
                      {tooltipCheckerOfTrioString(`${stud.surname} ${stud.name} ${stud.midname}`.length, stud, "", 25, "230px", "ФИО:")}
                    </NavLink>
                  </div>
                  <div>
                    <VisibilitySpan>Тел.Родителя:</VisibilitySpan> {stud.parentPhone}
                  </div>
                  <div>
                    <VisibilitySpan>Мин.Абонемент:</VisibilitySpan> {stud.minPaidSubscription || 0}₽
                  </div>
                  <StatusesBlock contains={stud.statuses.length}>
                    {stud.statuses.map(stat => (
                      <Tag key={stat._id} color={stat.color}>{stat.name}</Tag>
                    ))}
                  </StatusesBlock>
                  {stud.closestTask.length ? <Dropdown overlay={<ClosestTask closestTask={stud.closestTask[0]} />}>
                    <HoverTask>
                      Ближайшая задача
                    </HoverTask>
                  </Dropdown> : ""}
                </div>
              </FunnelStepStudent>
            )}
          </Draggable>
        )
      })}
    </>

  )
}