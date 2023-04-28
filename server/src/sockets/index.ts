import { createServer, IncomingMessage } from 'http';
import { Server, Socket } from 'socket.io';
import express, { Express, NextFunction, Request, Response } from 'express';
import session, { Session, SessionData } from 'express-session';
import { Schema } from 'mongoose';

type User = {
  id: Schema.Types.ObjectId;
  username: string;
  password: string;
};

declare module 'http' {
  interface IncomingMessage {
    session: Session & {
      user: User;
      isLoggedIn: boolean;
    };
  }
}

//interface SessionIncomingMessage extends IncomingMessage {
//  session: SessionData
//};

//interface SessionSocket extends Socket {
//  request: SessionIncomingMessage
//};

export const sockets = (
  app: Express,
  sessionMiddleware: ReturnType<typeof session>,
) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: ['http://localhost:1420', 'http://127.0.0.1:1420'],
      methods: ['POST', 'GET', 'OPTIONS', 'HEAD'],
    },
  });

  let clients: Array<{ username: string; socketId: string }> = [];

  const wrap = (middleware: any) => (socket: Socket, next: any) =>
    middleware(socket.request, {}, next);
  io.use(wrap(sessionMiddleware));

  //io.use((socket, next) => {
  //  sessionMiddleware(socket.request as Request, {} as Response, next as NextFunction);
  //});
  //io.engine.use(sessionMiddleware);

  io.on('connection', (socket: Socket) => {
    socket.on(
      'establish',
      (
        username: string,
        channels: Array<{ _id: string; channel_name: string }>,
      ) => {
        console.log(username, 'connected');
        const index = clients.findIndex(
          (client) => client.username === username,
        );
        if (index === -1 && username !== '') {
          clients.push({ username: username, socketId: socket.id });
        }
        if (channels) {
          const rooms = channels.map((channel) => channel._id);
          socket.join(rooms);
        }
      },
    );

    socket.on('disconnect', () => {
      clients = clients.filter((client) => {
        if (client.socketId === socket.id) {
          console.log(client.username, 'disconnected');
        }
        return client.socketId !== socket.id;
      });
    });

    socket.on('send-invite', (users: string[]) => {
      for (const user of users) {
        const client = clients.find((obj) => obj.username === user);
        if (client) io.to(client.socketId).emit('receive_invite');
      }
    });

    socket.on('new_videos', (channel: { id: string; channelName: string }) => {
      socket.to(channel.id).emit('video_update', channel.channelName);
    });

    socket.on('invite_accepted', (channel_id: string) => {
      socket.join(channel_id);
      socket.to(channel_id).emit('user_added');
    });

    socket.on('leave_channel', (_id: string) => {
      socket.to(_id).emit('user_left');
      socket.leave(_id);
    });
  });

  httpServer.listen(3000);
};
