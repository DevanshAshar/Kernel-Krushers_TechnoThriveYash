import json
from datetime import datetime, timedelta, timezone
from channels.generic.websocket import AsyncWebsocketConsumer
from user.models import User
from asgiref.sync import async_to_sync, sync_to_async
# from peerchat.models import Lobby

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("chat connect")
        self.lobby_code = self.scope["url_route"]["kwargs"]["lobby_code"]
        self.username = self.scope["url_route"]["kwargs"]["username"]
        
        await self.channel_layer.group_add(
            self.lobby_code,
            self.channel_name
        )
    
    async def disconnect(self,close_code):
        print(close_code)
        print('chat disconnect')
        await self.channel_layer.group_discard(
            self.lobby_code,
            self.channel_name
        )
        
    async def receive(self,chat_data):
        print('send and recieve')
        text_data = json.loads(chat_data)
        message = text_data['message']
        
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat.message", "message": message}
        )
        
    async def chat_message(self,event):
        print('chatting')
        message = event['message']
        
        await self.send(text_data=json.dumps({"message": message}))
        
        
        