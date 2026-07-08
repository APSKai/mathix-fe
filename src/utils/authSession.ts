import { CREDENTIALS } from '@/constants/storage'
import { removeLocalStorage } from '@/utils/storage'

export function clearAuthSession() {
    removeLocalStorage(CREDENTIALS.IS_LOGIN)
    removeLocalStorage(CREDENTIALS.AUTHENTICATION_TOKEN)
    removeLocalStorage(CREDENTIALS.USER_INFO)
}
