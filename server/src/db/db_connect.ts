import { DataSource } from "typeorm"
import dotenv from 'dotenv'
import path from 'path'
import { User } from "../entities/user.entity"
import { Post } from "../entities/post.entity"
import { Photo } from "../entities/photo.entity"
import { Session } from "../entities/session.entity"
import { Chat } from "../entities/chat.entity"
import { Message } from "../entities/message.entity"
import { WallPost } from "../entities/wall.entity"
import { AddUserStatus1710000000000 } from "../migrations/1710000000000-AddUserStatus"
import { AddUserAvatar1710000000001 } from "../migrations/1710000000001-AddUserAvatar"
import { AddWallPostIdToPhotos1710000000002 } from "../migrations/1710000000002-AddWallPostIdToPhotos"
import { ChangePhotoRelations1710000000003 } from "../migrations/1710000000003-ChangePhotoRelations"

// Загружаем переменные окружения
dotenv.config()

// Создаем подключение к базе данных
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "setka",
    synchronize: false, // Отключаем синхронизацию
    dropSchema: false,
    logging: process.env.NODE_ENV !== "production",
    entities: [User, Post, Photo, Session, Chat, Message, WallPost],
    migrations: [
        AddUserStatus1710000000000,
        AddUserAvatar1710000000001,
        AddWallPostIdToPhotos1710000000002,
        ChangePhotoRelations1710000000003
    ],
    subscribers: [],
    migrationsTableName: "migrations"
})

// Функция инициализации подключения
export const initializeDB = async () => {
    try {
        await AppDataSource.initialize()
        console.log("База данных успешно подключена")
    } catch (error) {
        console.error("Ошибка при подключении к базе данных:", error)
        throw error
    }
}
