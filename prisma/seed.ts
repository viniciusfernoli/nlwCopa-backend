import {PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      avatarUrl: 'https://github.com/viniciusfernoli.png',
    }
  })

  const pool = await prisma.pool.create({
    data:{
      title: 'Exemple pool',
      code: 'BOL123',
      ownerId: user.id,

      participants:{
        create:{
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data:{
      date: '2022-11-02T10:55:13.290Z',
      fistTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })

  await prisma.game.create({
    data:{
      date: '2022-11-03T19:15:13.290Z',
      fistTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses:{
        create:{
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          participant: {
            connect:{
              userId_poolId:{
                userId: user.id,
                poolId: pool.id
              }
            }
          } 
        }
      }
    }
  })
}

main()