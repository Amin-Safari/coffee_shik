import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        role: null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        userRole: (state) => state.role
    },

    actions: {
        async login(credentials) {
            try {
                // اینجا درخواست API برای ورود قرار می‌گیرد
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                })

                const data = await response.json()

                this.user = data.user
                this.token = data.token
                this.role = data.user.role

                // ذخیره توکن در localStorage
                localStorage.setItem('token', data.token)

                return true
            } catch (error) {
                console.error('خطا در ورود:', error)
                return false
            }
        },

        logout() {
            this.user = null
            this.token = null
            this.role = null
            localStorage.removeItem('token')
        },

        async checkAuth() {
            const token = localStorage.getItem('token')
            if (token) {
                try {
                    // اینجا درخواست API برای بررسی اعتبار توکن قرار می‌گیرد
                    const response = await fetch('/api/auth/me', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })

                    const data = await response.json()

                    this.user = data.user
                    this.token = token
                    this.role = data.user.role

                    return true
                } catch (error) {
                    this.logout()
                    return false
                }
            }
            return false
        }
    }
}) 