import factory from '@adonisjs/lucid/factories'
import Pet from '#models/pet'

export const PetFactory = factory
  .define(Pet, async ({ faker }) => {
    return {
      name: faker.internet.userName(),
      user_id:121245,
      breed: "Labrador",
      age: faker.number.int(20),
      gender: "male",
      size:"small",
      is_vaccinated:true,
      is_adopted:false,
      is_neutered:false,
      description:faker.definitions.animal.dog.toString(),
      images:["https://estaticos-cdn.prensaiberica.es/clip/823f515c-8143-4044-8f13-85ea1ef58f3a_16-9-discover-aspect-ratio_default_0.webp","https://www.aon.es/personales/seguro-perro-gato/wp-content/uploads/sites/2/2021/04/bichon-maltes.jpg"]

    }
  })
  .build()
