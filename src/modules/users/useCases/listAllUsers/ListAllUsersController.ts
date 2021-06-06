import { IncomingHttpHeaders } from 'http';
import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

declare module 'http' {
    interface IncomingHttpHeaders {
        "user_id"?: string
    }
}

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    try {
      const users = this.listAllUsersUseCase.execute({ user_id });

      return response.json(users);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { ListAllUsersController };
