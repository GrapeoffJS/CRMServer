// imports from plugins
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

// imports from files of project
import {
  FunnelSection,
  FunnelStep,
  FunnelStepAbonementSum,
  FunnelStepHeader,
  Wrapper,
} from './helpers/sales-funnel-styled'
import { SalesFunnelModal } from './sales-funnel-modal'
import { Loader } from './helpers/loader'
import { tooltipNeedsCheckerOfSingleString } from './helpers/tooltip-functions'
import UrlProd from '../../../url/url'
import { SalesFunnelStudents } from './sales-funnel-students'
import {
  axiosGetFunnelSteps,
  axiosUpdateStudent,
} from './helpers/axios-requests'

const SalesFunnel = () => {
  //TODO: Переименовать поля phone и phoneParent на мн.ч
  //TODO: Поля phones и phoneParents теперь массив.

  // data
  const status = 1
  const Url = status ? UrlProd : 'https://dvmncrm.herokuapp.com'
  // data

  // useState
  const [loaded, setLoaded] = useState(true)
  const [salesFunnelList, setSalesFunnelList] = useState([])
  const [pupilsList, setPupilsList] = useState([])
  // useState

  // useEffect
  useEffect(() => {
    const salesFunnelFromServer = async () => {
      const salesFunnelSteps = await axiosGetFunnelSteps(Url)
      setSalesFunnelList((prev) => (prev = salesFunnelSteps))
      setPupilsList(
        (prev) => (prev = salesFunnelSteps.map((step) => step.pupils).flat(2))
      )
      setLoaded((prev) => (prev = false))
    }
    salesFunnelFromServer()
    return () => {
      setSalesFunnelList((prev) => (prev = []))
      setPupilsList((prev) => (prev = []))
    }
  }, [Url])
  // useEffect

  // Methods
  const onDragEndHandler = async (result) => {
    if (!result.destination) {
      return setPupilsList((prev) => prev)
    }

    const array1 = pupilsList.filter(
      (stud) => stud.salesFunnelStep === result.source.droppableId
    )
    const array2 = pupilsList.filter(
      (stud) => stud.salesFunnelStep === result.destination.droppableId
    )
    const [deletingElement] = array1.splice(result.source.index, 1)

    if (result.source.droppableId === result.destination.droppableId) {
      array1.splice(result.destination.index, 0, deletingElement)

      return setPupilsList((prev) =>
        Array.from(new Set([...prev, ...array1, ...array2]))
      )
    }

    const oldStatuses = deletingElement.statuses
    deletingElement.statuses = deletingElement.statuses.map(
      (el) => (el = el._id)
    )
    deletingElement.salesFunnelStep = result.destination.droppableId

    await axiosUpdateStudent(Url, deletingElement._id, deletingElement)
    deletingElement.statuses = oldStatuses

    array2.splice(result.destination.index, 0, deletingElement)

    return setPupilsList((prev) =>
      Array.from(new Set([...prev, ...array1, ...array2]))
    )
  }
  // Methods

  return (
    <Wrapper>
      {loaded ? (
        <Loader />
      ) : (
        <FunnelSection jstctn={salesFunnelList.length < 6 ? true : false}>
          <DragDropContext onDragEnd={onDragEndHandler}>
            {salesFunnelList.map((card) => (
              <FunnelStep
                key={card._id}
                style={
                  card.name === 'Занимаются' || card.name === 'Занимается'
                    ? { display: 'none' }
                    : { display: 'block' }
                }
                className={'card'}
              >
                <FunnelStepHeader background={card.background}>
                  {tooltipNeedsCheckerOfSingleString(
                    card.name.length,
                    card.name,
                    '',
                    30,
                    '220px'
                  )}
                  {card.order === 1 ? (
                    <SalesFunnelModal
                      setLoaded={setLoaded}
                      status={status}
                      funnel={salesFunnelList}
                      Url={Url}
                      setPupilsList={setPupilsList}
                    />
                  ) : (
                    ''
                  )}
                </FunnelStepHeader>
                <FunnelStepAbonementSum background={card.background}>
                  {card.minPaidSubscriptionsAmount || 0}руб.
                </FunnelStepAbonementSum>
                <Droppable droppableId={`${card._id}`}>
                  {(provide) => (
                    <div
                      className="droppable-container"
                      {...provide.droppableProps}
                      ref={provide.innerRef}
                    >
                      <SalesFunnelStudents
                        card={card}
                        pupils={{ pupilsList, setPupilsList }}
                        Url={Url}
                      />
                      {provide.placeholder}
                    </div>
                  )}
                </Droppable>
              </FunnelStep>
            ))}
          </DragDropContext>
        </FunnelSection>
      )}
    </Wrapper>
  )
}

export default SalesFunnel
