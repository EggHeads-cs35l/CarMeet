export default function generate_decoded_image(img_binary) {
    if (img_binary === undefined || img_binary.data === undefined)
        return "https://picsum.photos/1080/720";
    const img = `data:image/png;base64,` + btoa(
        img_binary.data.data.reduce((data, byte) => data + String.fromCharCode(byte), ''));
    return img;
}