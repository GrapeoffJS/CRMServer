import {List} from "antd"

export const getActionPermissions = arr => {
    let list = arr.map(title => {
        switch (title) {
            case 0:
                return 'Создать группу'
            case 1:
                return 'Изменить группу'
            case 2:
                return 'Удалить группу'
            case 3:
                return 'Получить список групп'
            case 4:
                return 'Просмотреть страницу группы'
            case 5:
                return 'Установить расписание группы'
            case 6:
                return 'Обновить расписание учеников'
            case 7:
                return 'Добавить учеников в группу'
            case 8:
                return 'Удалить ученика из группы'
            case 9:
                return 'Добавить учителя'
            case 10:
                return 'Создать ученика'
            case 11:
                return 'Изменить ученика'
            case 12:
                return 'Удалить ученика'
            case 13:
                return 'Получить список учеников'
            case 14:
                return 'Зайти на страницу ученика'
            case 15:
                return 'Импортировать файл'
            case 16:
                return 'Создать платеж'
            case 17:
                return 'Создать заметку'
            case 18:
                return 'Удалить заметку'
            case 19:
                return 'Использовать поиск'
            case 20:
                return 'Воронка продаж'
            default:
                return '****';
        }
    })

    return list.map(text => (
        <List.Item key={text}>
            {text}
        </List.Item>
    ))
}

export const getDataPermissions = arr => {
    // console.log()
    let arrDataPermissions = Object.keys({...arr.forPupil, ...arr.forGroup})

    let list = arrDataPermissions.map(title => {
        switch (title) {
            case 'phone':
                return 'Телефон'
            case 'parentPhone':
                return 'Родительский телефон'
            case 'balance':
                return 'Баланс'
            case 'discord':
                return 'Discord'
            case 'paymentHistory':
                return 'Историю платежей'
            case 'notes':
                return 'Заметки'
            case 'groupsHistory':
                return 'Историю групп'
            case 'groups':
                return 'Список групп'
            case 'tutors':
                return 'Преподавателей ученика'
            case 'localSchedule':
                return 'Расписание'
            case 'group_name':
                return 'Имя группы'
            case 'level':
                return 'Уровень группы'
            case 'tutor':
                return 'Учителя группы'
            case 'pupils':
                return 'Ученики группы'
            case 'places':
                return 'Количество мест в группе'
            case 'global_schedule':
                return 'Расписание группы'
            case 'name':
                return 'Имя ученика'
            case 'midname':
                return 'Фамилию ученика'
            case 'surname':
                return 'Отчество ученика'
            case 'parentFullname':
                return 'Фамилия, Имя, Отчество родителя'
            case 'salesFunnelStep':
                return 'Этап воронки продаж'
            case 'dateOfBirth':
                return 'Возраст'
            case 'gender':
                return 'Пол'
            case 'statuses':
                return 'Статусы'
            default:
                return '****'
        }
    })

    return list.map(text => (
        <List.Item key={text}>
            {text}
        </List.Item>
    ))

}