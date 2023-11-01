import amqplib from 'amqplib'

let channel, connection

// Source : https://sharmilas.medium.com/get-started-with-rabbitmq-in-node-js-1adb18d019d0
// RabbitMq implementing the asynchronous single-receiver pattern.
export const connectRabbitmq = async () => {
  try {
    // TODO: Change RabbitMQ URl
    //connection = await amqplib.connect('amqp://127.0.0.1')
    connection = await amqplib.connect('amqp://user:judhnvfojgvo64765876874hfn@kanin-rabbitmq.default.svc.cluster.local')

    channel = await connection.createChannel()

    await channel.assertQueue('NEW-FOLLOWER')
    await channel.assertQueue('UN-FOLLOWER')
  } catch (error) {
    console.log(error)
  }
}
// queue from follow-service to litterbox-service when user wants to FOLLOW another user
export const sendNewFollowerToQueue = async (data) => {
  await channel.sendToQueue('NEW-FOLLOWER', Buffer.from(JSON.stringify(data)))
  console.log(Buffer.from(JSON.stringify(data)), 'new follower queue')
}

// queue from follow-service to litterbox-service when user wants to UNFOLLOW another user
export const sendUnfollowToQueue = async (data) => {
  await channel.sendToQueue('UN-FOLLOWER', Buffer.from(JSON.stringify(data)))
  console.log(data, 'unfollower queue')
}
