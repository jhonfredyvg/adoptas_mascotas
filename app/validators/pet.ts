import vine from '@vinejs/vine'

export const petValidator = vine.compile(
    vine.object({
        user_id: vine.number().optional(),
        name: vine.string(),
        breed: vine.string(),
        age: vine.number().withoutDecimals(),
        gender: vine.string(),
        size: vine.string(),
        is_vaccinated: vine.boolean(),
        is_adopted: vine.boolean().optional(),
        is_neutered: vine.boolean(),
        description: vine.string().trim().escape().optional()
    })
)