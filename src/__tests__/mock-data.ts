import faker from 'faker'

export const mock = {
  session: {
    convert: jest.fn(),
    participate: jest.fn()
  },
  variations: ['a', 'b'],
  kpi: faker.lorem.word(),
  message: faker.lorem.words(),
  baseUrl: faker.internet.url(),
  traffic: faker.random.number(),
  experimentName: faker.lorem.word(),
  alternativeName: faker.random.arrayElement(['a', 'b'])
}
