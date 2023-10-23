declare module "cloudinary" {
    interface Cloudinary {
      api: {
        delete_resources(publicIds: string[]): Promise<void>;
      };
    }
  }