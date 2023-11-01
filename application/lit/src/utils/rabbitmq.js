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

    channel = channel = await connection.createChannel()

    await channel.assertQueue('NEW-LIT')
    await channel.assertQueue('NEW-LIT-LITTERBOX')
  } catch (error) {
    console.log(error)
  }
}

export const sendLitToQueue = async (data) => {
  await channel.sendToQueue('NEW-LIT', Buffer.from(JSON.stringify(data)))
  await channel.sendToQueue(
    'NEW-LIT-LITTERBOX',
    Buffer.from(JSON.stringify(data))
  )
}

export const consumeNewLitsFromGateway = async () => {
  console.log('in Lit utils consumeData RabbitMQ')
  console.log('a new lit came in from gateway to Lit service!')
  try {
    await channel.assertQueue('NEW-LIT-FROM-GATEWAY')
    channel.consume('NEW-LIT-FROM-GATEWAY', (data) => {
      const msg = JSON.parse(data.content)
      channel.ack(data)
      const newLit = {
        userId: msg.userId,
        description: msg.description,
        followers: msg.followers,
      }
      if (msg !== undefined) {
        saveNewLitToLitDB(newLit)
      }
    })
  } catch (error) {
    console.error(error)
  }
}

function saveNewLitToLitDB(lit) {
  const controller = new Controller()
  controller.saveConsumedLit(lit)
}
