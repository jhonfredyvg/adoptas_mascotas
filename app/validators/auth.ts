import vine from '@vinejs/vine'


export const registerValidator = vine.compile(
    vine.object({
        email: vine.string().email().unique(async (db, value) => {
            const user = await db
                .from('users')               
                .where('email', value)
                .first()
            return !user
        }),
        password: vine.string().minLength(8).confirmed()
    })
)

export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().email().normalizeEmail(),
        password: vine.string(),
        isRememberMe: vine.accepted().optional(),
    })
)