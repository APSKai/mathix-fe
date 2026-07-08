import { User } from '@/interfaces/user/user.interface'

export interface AuthSliceState {
    isAuthenticated: boolean
    user: User | null
}
