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
    socket.on('establish', (username: string, channels: string[]) => {
      console.log(username, 'connected');
      const index = clients.findIndex((client) => client.username === username);
      if (index === -1 && username !== '') {
        clients.push({ username: username, socketId: socket.id });
        console.log(clients);
      }
      //if(channels.length > 0){
      //  console.log('joining:', channels);
      //  socket.join(channels);
      //}
    });

    socket.on('disconnect', () => {
      clients = clients.filter((client) => {
        if(client.socketId === socket.id) console.log(client.username, 'disconnected');
        return client.socketId !== socket.id;
      });
    });

    socket.on('send-invite', (users: string[]) => {
      console.log(users);
      for (const user of users) {
        const client = clients.find((obj) => obj.username === user);
        if (client) io.to(client.socketId).emit('receive_invite');
      }
    });

    socket.on('new_videos', (room: string) => {
      console.log('vidoes to:', room);
      socket.to(room).emit('video_update');
    });
  });

  httpServer.listen(3000);
};
