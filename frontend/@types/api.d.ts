declare module "api" {
  type ApiError = {
    message: string;
    error?: unknown;
  };
}
