import { IProviderOptions } from "./base";

// ipx implementation
interface IPXOptions extends IProviderOptions {
  url: string;
  src: string;
  width?: number;
  quality?: number;
  format?: string;
  blur?: boolean;
}

const getKeys = <T extends object>(obj: T) => Object.keys(obj) as Array<keyof T>;

export function generateUrl(options: IPXOptions) {
  const encodedImage = encodeURIComponent(options.src);
  const ipxOptions = {
    image: encodedImage,
    width: options.width,
    format: options.format,
    quality: options.quality,
    blur: options.blur,
  };

  const ipxOptionsString = getKeys(ipxOptions)
    .filter((key) => ipxOptions[key] !== undefined)
    .map((key) => [key, ipxOptions[key]].join("_"))
    .join(",");

  return `${options.url}/${ipxOptionsString}/${options.src}`;
}
