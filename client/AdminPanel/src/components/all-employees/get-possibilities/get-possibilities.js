export const actionPermissionsGet = (arrText) => {

	return arrText.map((item, i) => {
		switch (item) {
		    case 0:
		        return "Создать группу";
		    case 1:
		        return "Изменить группу";
		    case 2:
		        return "Удалить группу";
		    case 3:
		        return "Получить список групп";
		    case 4:
		        return "Просмотреть страницу группы";
		    case 5:
		        return "Установить расписание группы";
		    case 6:
		        return "Обновить расписание учеников";
		    case 7:
		        return "Добавить учеников в группу";
		    case 8:
		        return "Удалить ученика из группы";
		    case 9:
		        return "Добавить учителя";
		    case 10:
		        return "Создать ученика";
		    case 11:
		        return "Изменить ученика";
		    case 12:
		        return "Удалить ученика";
		    case 13:
		        return "Получить список учеников";
		    case 14:
		        return "Зайти на страницу ученика";
		    case 15:
		        return "Импортировать файл";
		    case 16:
		        return "Создать платеж";
		    case 17:
		        return "Создать заметку";
		    case 18:
		        return "Удалить заметку";
		    case 19:
		        return "Использовать поиск";
		    default:
		        return;
		}
	})
}

export const dataPermissionsGet = (arr) => {

	// console.log(arrText)
    let arrDataPermissions = Object.keys({...arr.forPupil, ...arr.forGroup})

	return arrDataPermissions.map((item) => {
        switch (item) {
            case 'phone':
                return 'Телефон'
            case 'parentPhone':
                return 'Родительский телефон'
            case 'parentNSM':
                return 'Родительские инициалы'
            case 'balance':
                return 'Баланс'
            case 'discord':
                return 'Discord'
            case 'paymentHistory':
                return 'Исторя платежей'
            case 'notes':
                return 'Заметки'
            case 'groupsHistory':
                return 'Историю групп'
            case 'groups':
                return 'Список групп'
            case 'tutors':
                return 'Учителя'
            case 'localSchedule':
                return 'Расписание'
            case 'GROUP_NAME':
                return 'Имя группы'
            case 'LEVEL':
                return 'Уровень группы'
            case 'TUTOR':
                return 'Учителя группы'
            case 'PUPILS':
                return 'Ученики группы'
            case 'PLACES':
                return 'Количество мест в группе'
            case 'GLOBAL_SCHEDULE':
                return 'Расписание группы'
            case 'name':
                return 'Имя ученика'
            case 'midname':
                return 'Фамилию ученика'
            case 'surname':
                return 'Отчество ученика'
            default:
                return;
        }
	})
}