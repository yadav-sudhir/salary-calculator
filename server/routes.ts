import type { Express } from "express";
import { createServer, type Server } from "http";

export function registerRoutes(app: Express ): Server {
  // Basic routes can go here if needed in the future
  const httpServer = createServer(app );
  return httpServer;
}
