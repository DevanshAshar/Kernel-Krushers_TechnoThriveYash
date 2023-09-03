import json
from datetime import datetime, timedelta, timezone
from channels.generic.websocket import AsyncWebsocketConsumer
from user.models import User
from peerchat.models import Room
from asgiref.sync import async_to_sync, sync_to_async
# from peerchat.models import Lobby

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("chat connect")
        self.lobby_code = self.scope["url_route"]["kwargs"]["lobby_code"]
        print(self.lobby_code)
        self.room_group_name = self.lobby_code
        self.room = await sync_to_async(Room.objects.filter(room_id=self.lobby_code).first)()
        print('sdf')
        if not self.room:
                await self.accept()
                print("send mess to fronted")
                # Room doesn't exist, send a custom message to the frontend
                await self.send(text_data=json.dumps({
                    'status' : 404,
                    'message': 'Room does not exist'
                }))
                await self.close()
                return
        self.room.user_count += 1
        await sync_to_async(self.room.save)()
        await self.accept()
        await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            
    
    async def disconnect(self,close_code):
        print(close_code)
        print('chat disconnect')
        if self.room:
            self.room.user_count -= 1
            await sync_to_async(self.room.save)()
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        
    async def receive(self,text_data):
        print('send and recieve')
        text_data = json.loads(text_data)
        message = text_data['message']
        
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat.message", "message": message}
        )
        
    async def chat_message(self,event):
        print('chatting')
        message = event['message']
        
        await self.send(text_data=json.dumps({"message": message}))
        
        
        