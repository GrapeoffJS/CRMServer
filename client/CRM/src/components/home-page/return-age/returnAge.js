import moment from 'moment';

const ReturnAge = (data) => {

    let year = moment(data).format('YYYY-MM-DD') // , 'YYYY-MM-DD'

    let dateOfBirth = moment().diff(year, 'years')

    return dateOfBirth ? dateOfBirth : 'Не указан';
}

export default ReturnAge