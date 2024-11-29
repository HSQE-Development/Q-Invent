export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const removeBase64Prefix = (base64: string): string => {
  // Remover la parte antes de la coma (,) que incluye "data:[tipo/archivo];base64,"
  return base64.split(",")[1] ?? base64;
};
