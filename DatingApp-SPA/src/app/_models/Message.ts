export interface Message {

    id:number;
    senderId:number;
    senderKnowAs:string;
    senderPhotoUrl:string;
    recipientId:number;
    recipientKnowAs:string;
    recipientPhotoUrl:string;
    isRead:boolean;
    messageSent:Date;
    dateRead:Date;

}
