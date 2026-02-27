import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server,Socket } from 'socket.io';

@WebSocketGateway()
export class CommentsGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('New client connected:', client.id);

    client.on('disconnect', () => {
      console.log('Client disconnected:', client.id);
    });
  }

  @SubscribeMessage('newComment')
  handleNewComment(@MessageBody() comment: any): void {
    this.server.emit('newComment', comment);
  }

  @SubscribeMessage('newReply')
  handleNewReply(@MessageBody() reply: any): void {
    this.server.emit('newReply', reply);
  }
}
