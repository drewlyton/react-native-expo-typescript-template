/// <reference types="nativewind/types" />
declare module "*.ttf" {
  const value: import("expo-font").FontSource;
  export default value;
}
