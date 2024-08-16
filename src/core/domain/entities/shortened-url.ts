import { randomUUID } from "crypto";

type IShortenedUrl = {
  id: string;
  link: string;
  sorted: string;
  clicks: number;
  deletedAt?: Date;
  userId?: string;
  updatedAt?: Date;
  createdAt?: Date;
};

export class ShortenedUrl {
  id: string;
  link: string;
  sorted: string;
  userId?: string;
  clicks: number;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  constructor(props: IShortenedUrl) {
    this.clicks = props.clicks;
    this.id = props.id;
    this.link = props.link;
    this.sorted = props.sorted;
    this.deletedAt = props.deletedAt;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
  static create(props: { link: string; userId?: string }) {
    const id = randomUUID();
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let sorted = "";

    for (let i = 0; i < 6; i++) {
      sorted += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return new ShortenedUrl({
      clicks: 0,
      id: id,
      link: props.link,
      sorted: sorted,
      userId: props.userId,
    });
  }
}
