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
  // console.log('in Pedigree utils consumeData RabbitMQ')
  // console.log('a new lit came in from Lit to Pedigree service!')
  try {
    await channel.assertQueue('NEW-LIT')
    channel.consume('NEW-LIT', (data) => {
      const msg = JSON.parse(data.content)
      channel.ack(data)
      const newLit = {
        userId: msg.userId,
        description: msg.description,
        litId: msg.litId,
      }
      if (msg !== undefined) {
        saveNewLitToPedigreeDB(newLit)
      }
    })
  } catch (error) {
    console.error(error)
  }
}

function saveNewLitToPedigreeDB(newLit) {
  const controller = new Controller()
  controller.updatePedigreeWithNewLit(newLit)
}
