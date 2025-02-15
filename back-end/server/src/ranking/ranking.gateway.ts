import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ScoreService } from 'src/score/score.service';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class RankingGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly scoreService: ScoreService) {}

  afterInit(server: Server) {
    console.log('WebSocket Gateway inicializado');
  }

  handleConnection(client: any) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('updateScore')
async handleScoreUpdate(@MessageBody() data: { userId: string; score: number }) {
  console.log('Evento recibido:', data);
  console.log('Tipo de dato recibido:', typeof data); // Debe ser "object"

  if (!data.userId || data.score === undefined) {
    console.error('Error: userId o score no proporcionados');
    return;
  }

  if (typeof data.score !== 'number') {
    console.error('Error: El score recibido no es un número válido:', data.score);
    return;
  }

  await this.scoreService.updateUserScore(data.userId, data.score);
  const ranking = await this.scoreService.getRanking();

  console.log('Ranking actualizado:', ranking);
  this.server.emit('rankingUpdated', ranking);
}

  


}
