import AuthService from "../service/AuthService"

export default {
    // Handler untuk login
    login: async (req, res) => {
        try {
            // Ambil data dari request body
            const {
                username,
                password
            } = req.body

            // Validasi input
            if (!username || !password) {
                return res.status(400).json({
                    error: 'Email dan password diperlukan'
                })
            }

            // Panggil service untuk login
            const result = await AuthService.login(username, password)

            // Cek hasil login
            if (result.success) {
                // Set cookie atau session jika perlu
                // Contoh: 
                // res.setHeader('Set-Cookie', `token=${generateToken(result.user)}; HttpOnly`)

                return res.status(200).json({
                    message: 'Login berhasil',
                    user: result.user
                })
            } else {
                return res.status(401).json({
                    error: result.error
                })
            }
        } catch (error) {
            console.error('Login error:', error)
            return res.status(500).json({
                error: 'Kesalahan server'
            })
        }
    }


}
