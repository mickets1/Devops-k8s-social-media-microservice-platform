import amqplib from 'amqplib'

let channel, connection

// Source : https://sharmilas.medium.com/get-started-with-rabbitmq-in-node-js-1adb18d019d0
// RabbitMq implementing the asynchronous single-receiver pattern.
export const connectRabbitmq = async () => {
  try {
    // TODO: Change RabbitMQ URl
    //connection = await amqplib.connect('amqp://127.0.0.1')
    connection = await amqplib.connect('amqp://user:password@kanin-rabbitmq.default.svc.cluster.local')

    channel = await connection.createChannel()

    await channel.assertQueue('NEW-LIT-FROM-GATEWAY')
  } catch (error) {
    console.log(error)
  }
}

export const sendData = async (data) => {
  await channel.sendToQueue(
    'NEW-LIT-FROM-GATEWAY',
    Buffer.from(JSON.stringify(data))
  )
}

export const consumeData = async () => {
  try {
    await channel.assertQueue('NEW-LIT-FROM-GATEWAY')

    channel.consume('NEW-LIT-FROM-GATEWAY', (data) => {
      console.log(`${Buffer.from(data.content)}`)
      channel.ack(data)
    })
  } catch (error) {
    console.error(error)
  }
}
