import { Toast } from '../../alert/alert.js'

const RestrictionMessage = status => {
	if (status == 403) {
		Toast.fire({
			icon: 'error',
			title: 'У вас недостаточно прав для этого действия'
		});
	}
}

export default RestrictionMessage