import amqplib from 'amqplib'
import { Controller } from '../controllers/controller.js'

let channel, connection

// Source : https://sharmilas.medium.com/get-started-with-rabbitmq-in-node-js-1adb18d019d0
// RabbitMq implementing the asynchronous single-receiver pattern.
export const connectRabbitmq = async () => {
  try {
    // TODO: Change RabbitMQ URl
    //connection = await amqplib.connect('amqp://127.0.0.1')
    connection = await amqplib.connect('amqp://user:judhnvfojgvo64765876874hfn@kanin-rabbitmq.default.svc.cluster.local')

    channel = await connection.createChannel()

    await channel.assertQueue('queue')
  } catch (error) {
    console.log(error)
  }
}

export const sendData = async (data) => {
  await channel.sendToQueue('queue', Buffer.from(JSON.stringify(data)))
}

export const consumeNewLits = async () => {
  try {
    await channel.assertQueue('NEW-LIT-LITTERBOX')
    channel.consume('NEW-LIT-LITTERBOX', (data) => {
      const msg = JSON.parse(data.content)
      channel.ack(data)
      const newLit = {
        userId: msg.userId,
        description: msg.description,
        litId: msg.litId,
        litFollowers: msg.followers,
        litDate: msg.created
      }
      if (msg !== undefined) {
        saveNewLitToLitterboxDB(newLit)
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export const consumeNewFollower = async () => {
  try {
    await channel.assertQueue('NEW-FOLLOWER')
    channel.consume('NEW-FOLLOWER', (data) => {
      const msg = JSON.parse(data.content)
      channel.ack(data)
      const newFollower = {
        follower: msg.follower,
        follows: msg.follows,
      }
      if (msg !== undefined) {
        getLitsToNewFollower(newFollower)
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export const consumeUnFollow = async () => {
  try {
    await channel.assertQueue('UN-FOLLOWER')
    channel.consume('UN-FOLLOWER', (data) => {
      const msg = JSON.parse(data.content)
      channel.ack(data)
      const newUnFollow = {
        theOneWhoWantsToUnFollow: msg.theOneWhoWantsToUnFollow,
        theOneToUnFollow: msg.theOneToUnFollow,
      }
      if (msg !== undefined) {
        removeLitsFromLitterbox(newUnFollow)
      }
    })
  } catch (error) {
    console.error(error)
  }
}

function removeLitsFromLitterbox(unFollower) {
  const controller = new Controller()
  controller.removeLitsFromLitterbox(unFollower)
}

function getLitsToNewFollower(newFollower) {
  const controller = new Controller()
  controller.updateLitterboxWithNewFollower(newFollower)
}

function saveNewLitToLitterboxDB(newLit) {
  const controller = new Controller()
  controller.updateLitterboxWithNewLit(newLit)
}
